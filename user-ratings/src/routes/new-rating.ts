import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RatingExistsError } from '../errors/rating-exists-error';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Product } from '../models/product';
import { Rating } from '../models/rating';
import { User } from '../models/user';

const ratingValidationRules = () => {
	return [
		body('rating')
			.notEmpty()
			.isFloat({ min: 0, max: 5 })
			.withMessage('rating cant be specified + under 0 or over 5'),
		body('product').notEmpty().withMessage('product cant be empty')
	];
};
const router = express.Router();

router.post(
	'/api/user-ratings',
	requireAuth,
	ratingValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		const { product: productId, rating } = req.body;

		// if sessionInfo didnt exist requireAuth wouldve thrown error, guarenteed exists
		const user = await User.findById(req.sessionInfo!.id);

		const product = await Product.findById(productId);
		if (!product) {
			throw new BadRequestError(`the product youre trying to rate (${productId}) doesnt exist`);
		}

		const existingRating = await Rating.findOne({ user: user!.id, product: productId });
		if (existingRating) {
			throw new RatingExistsError(`this rating exists, try modifing it :// (rating id-- ${existingRating.id})`);
		}

		const ratingObj = Rating.build({
			product: product,
			user: user!,
			rating
		});
		await ratingObj.save();

		// events and all that go here

		res.status(201).send(ratingObj);
	}
);

export { router as newRatingRouter };
