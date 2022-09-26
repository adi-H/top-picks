import express, { Request, Response } from 'express';
import { NotFoundError } from '@adih-toppicks/common';
// import { NotFoundError } from '../errors/not-found-error';
import { Product } from '../models/product';
import { Rating } from '../models/rating';

const router = express.Router();

router.get('/api/user-ratings/product/:productId', async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.productId);
	if (!product) {
		throw new NotFoundError();
	}

	const ratings = await Rating.find().populate('user');
	const ratingsByProduct = ratings.filter((r) => r.product == product._id);
	// const ratingsByProduct = await Rating.find({ 'product._id': product.id });
	res.send(ratingsByProduct);
});

export { router as byProductRouter };
