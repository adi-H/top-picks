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

const ratingValidationRules = () => {
	return [
		body('rating')
			.notEmpty()
			.isFloat({ min: 0, max: 5 })
			.withMessage('rating cant be specified + under 0 or over 5'),
		body('product').notEmpty().withMessage('product cant be empty'),
		body('description')
			.notEmpty()
			.withMessage('product cant be empty')
			.optional({ nullable: true, checkFalsy: true })
	];
};
const router = express.Router();

router.put(
	'/api/user-ratings/:id',
	requireAuth,
	// ratingValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		// const { product: productId, rating, description = '' } = sanitize(req.body);

		// // if sessionInfo didnt exist requireAuth wouldve thrown error, guarenteed exists
		// const user = await User.findById(req.sessionInfo!.id);

		// const product = await Product.findById(productId);
		// // console.log(product);
		// if (!product) {
		// 	throw new BadRequestError(`the product youre trying to rate (${productId}) doesnt exist`);
		// }

		// const existingRating = await Rating.findOne({ user: user!.id, product: productId });
		// if (existingRating) {
		// 	throw new RatingExistsError(`this rating exists, try modifing it :// (rating id-- ${existingRating.id})`);
		// }

		// const ratingObj = Rating.build({
		// 	product: product,
		// 	user: user!,
		// 	rating,
		// 	description
		// });
		// await ratingObj.save();

		// // events and all that go here
		// new NewRatingPostedPublisher(natsWrapper.client).publish({
		// 	productId: ratingObj.product.id,
		// 	rating: ratingObj.rating,
		// 	userId: ratingObj.user.id
		// });

		// // calc the new avg rating for the product and publish event
		// const allProductRating = await (await Rating.find().populate('product')).filter(
		// 	(r) => r.product._id == product.id
		// );
		// const newAvgRating =
		// 	allProductRating.length > 1
		// 		? allProductRating.map((r) => r.rating).reduce((prev, next) => prev + next) / allProductRating.length
		// 		: ratingObj.rating;

		// new ProductRatingUpdatedPublisher(natsWrapper.client).publish({
		// 	productId: product.id,
		// 	avgRating: newAvgRating
		// });

		// // updates the products avg rating + the ratingObj so it can be sent back
		// product.avgRating = newAvgRating;
		// await product.save();
		// ratingObj.product = product;
		// await ratingObj.save();

		// res.status(201).send(ratingObj);
		res.status(201).send({});
	}
);

export { router as updateRatingRouter };
