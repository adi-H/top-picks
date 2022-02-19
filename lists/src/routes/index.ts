import express, { Request, Response } from 'express';
import { List } from '../models/lists';

const router = express.Router();

router.get('/api/lists', async (req: Request, res: Response) => {
	const lists = await List.find().populate('user');

	res.status(200).send(lists);
});

export { router as indexRouter };
