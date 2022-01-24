import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';

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
	(req: Request, res: Response) => {
		res.status(201).send('pong');
	}
);

export { router as newRatingRouter };
