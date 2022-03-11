import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Product } from '../models/product';
import { Rating } from '../models/rating';

const router = express.Router();

router.get('/api/user-ratings/product/count/:productId', async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.productId);
	if (!product) {
		throw new NotFoundError();
	}

	const ratings = await Rating.find();
	const ratingsByProduct = ratings.filter((r) => r.product == product._id);
	// const ratingsByProduct = await Rating.find({ 'product._id': product.id });
	console.log(ratingsByProduct);
	res.send({ count: ratingsByProduct.length });
});

export { router as ratingsCountByProductRouter };
