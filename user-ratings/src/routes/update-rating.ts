import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RatingExistsError } from '../errors/rating-exists-error';
import { ProductRatingUpdatedPublisher, NewRatingPostedPublisher } from '@adih-toppicks/common';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Product } from '../models/product';
import { Rating } from '../models/rating';
import { User } from '../models/user';
import { natsWrapper } from '../nats-wrapper';
import sanitize from 'mongo-sanitize';
import { CustomError } from '../errors/custom-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NotAuthorizedForActionError } from '../errors/not-authorized-for-action-error';

const ratingValidationRules = () => {
	return [
		body('rating')
			.isFloat({ min: 0, max: 5 })
			.withMessage('rating cant be specified + under 0 or over 5')
			.optional(),
		body('description').isString().optional({ nullable: true, checkFalsy: true })
	];
};
const router = express.Router();

router.put(
	'/api/user-ratings/:id',
	requireAuth,
	ratingValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		const { rating, description } = sanitize(req.body);

		const ratingObj = await Rating.findById(req.params.id);
		if (!ratingObj) {
			throw new RatingExistsError(`this rating doesnt exist :// (rating id-- ${req.params.id})`);
		}

		// if sessionInfo didnt exist requireAuth wouldve thrown error, guarenteed exists
		const user = await User.findById(req.sessionInfo!.id);
		if (user!.id !== ratingObj.user) {
			throw new NotAuthorizedForActionError();
		}

		if (description && description !== ratingObj.description) {
			ratingObj.description = description;
		}

		if (rating && rating !== ratingObj.rating) {
			ratingObj.rating = rating;
		}

		await ratingObj.save();

		// TODO add publisher for updated / modified rating and all that

		// // events and all that go here
		// new NewRatingPostedPublisher(natsWrapper.client).publish({
		// 	productId: ratingObj.product.id,
		// 	rating: ratingObj.rating,
		// 	userId: ratingObj.user.id
		// });

		const product = await Product.findById(ratingObj.product);
		if (!product) {
			throw new BadRequestError(`the product youre trying to rate (${ratingObj.product.id}) doesnt exist`);
		}
		// calc the new avg rating for the product and publish event
		const allProductRating = await (await Rating.find().populate('product')).filter(
			(r) => r.product._id == product.id
		);
		const newAvgRating =
			allProductRating.length > 1
				? allProductRating.map((r) => r.rating).reduce((prev, next) => prev + next) / allProductRating.length
				: ratingObj.rating;

		new ProductRatingUpdatedPublisher(natsWrapper.client).publish({
			productId: product.id,
			avgRating: newAvgRating
		});

		// updates the products avg rating + the ratingObj so it can be sent back
		product.avgRating = newAvgRating;
		await product.save();
		ratingObj.product = product;
		await ratingObj.save();

		res.status(201).send(ratingObj);
	}
);

export { router as updateRatingRouter };
