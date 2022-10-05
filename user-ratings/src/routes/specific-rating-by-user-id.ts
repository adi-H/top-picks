import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Rating } from '../models/rating';
import { User } from '../models/user';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/user-ratings/product/:productId/user/:userId', async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId);
	if (!user) {
		throw new NotFoundError();
	}
	const product = await Product.findById(req.params.productId);
	if (!product) {
		throw new NotFoundError();
	}

	const ratings = await Rating.find();

	const ratingsByUser = ratings.filter((r) => Object.is(r.user.toString(), user.id));
	const rating = ratingsByUser.filter((r) => Object.is(r.product.toString(), product.id));
	// returns only the single rating ( product x user ) that was requested
	res.send(rating[0]);
});

export { router as specificProductByUserRouter };
