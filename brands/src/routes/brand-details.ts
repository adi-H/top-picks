import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Brand } from '../models/brand';

const router = express.Router();

router.get('/api/brands/:id', async (req: Request, res: Response) => {
	try {
		const brand = await Brand.findById(req.params.id);
		if (!brand) {
			throw new NotFoundError();
		}

		res.send(brand);
	} catch (e) {
		throw new NotFoundError();
	}
});

export { router as specificBrandRouter };
