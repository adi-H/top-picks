import express, { Request, Response } from 'express';
import { Brand } from '../models/brand';

const router = express.Router();

router.get('/api/brands', async (req: Request, res: Response) => {
	const brands = await Brand.find();

	res.send(brands);
});

export { router as indexBrandsRouter };
