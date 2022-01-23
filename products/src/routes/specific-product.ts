import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products/:id', async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			throw new NotFoundError();
		}

		res.send(product);
	} catch (e) {
		throw new NotFoundError();
	}
});

export { router as specificProductRouter };
