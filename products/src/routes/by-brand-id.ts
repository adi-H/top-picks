import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Brand } from '../models/brand';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products/brand/:id', async (req: Request, res: Response) => {
	try {
		const brand = await Brand.findById(req.params.id);
		if (!brand) {
			throw new NotFoundError();
		}
		const products = await Product.find();
		console.log(products);

		const byBrand = products.filter((p) => Object.is(p.brand.toString(), req.params.id));

		console.log(byBrand);
		res.status(200).send(byBrand);
	} catch (e) {
		throw new NotFoundError();
	}
});

export { router as byBrandIdRouter };
