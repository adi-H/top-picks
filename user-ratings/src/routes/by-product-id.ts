import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Product } from '../models/product';
import { Rating } from '../models/rating';

const router = express.Router();

router.get('/api/user-ratings/:productId', async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.productId);
	if (!product) {
		throw new NotFoundError();
	}
	console.log(product);
	const ratings = await Rating.find();
	const ratingsByProduct = ratings.filter((r) => r.product._id == product._id);
	// const ratingsByProduct = await Rating.find({ 'product._id': product.id });
	res.send(ratingsByProduct);
});

export { router as byProductRouter };
