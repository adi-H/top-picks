import { NotFoundError } from './../errors/not-found-error';
import express, { Request, Response } from 'express';
import { List } from '../models/lists';

const router = express.Router();

router.get('/api/lists/:id', async (req: Request, res: Response) => {
	let list = undefined;
	try {
		list = await List.findById(req.params.id).populate('user');
	} catch (e) {
		throw new NotFoundError();
	}

	if (list == undefined) {
		throw new NotFoundError();
	}

	res.status(200).send(list);
});

export { router as specificListRouter };
