import { NotFoundError } from './../errors/not-found-error';
import express, { Request, Response } from 'express';
import { List } from '../models/lists';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/lists/user/:userId', async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId);
	if (!user) {
		throw new NotFoundError();
	}

	const lists = await List.find().populate('user');

	const listsByUser = lists.filter((l) => {
		console.log(l, user);
		return Object.is(l.user._id, user.id);
	});

	res.status(200).send(listsByUser);
});

export { router as bySpecificUserRouter };
