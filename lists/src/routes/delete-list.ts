import { ListDeletedPublisher } from './../events/publishers/list-deleted';
import { NotAuthorizedError } from './../errors/not-authorized-error';
import { NotFoundError } from './../errors/not-found-error';
import express, { Request, Response } from 'express';
import { List } from '../models/lists';
import { requireAuth } from '../middlewares/require-auth';
import { User } from '../models/user';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/lists/:id', requireAuth, async (req: Request, res: Response) => {
	// if user didnt exist requireAuth would throw
	const user = await User.findById(req.sessionInfo!.id);

	let list = undefined;
	try {
		list = await List.findById(req.params.id);
	} catch (e) {
		throw new NotFoundError();
	}

	if (!list || list == undefined) {
		throw new NotFoundError();
	}

	// sigh u gotta use toString or it decides theyre not equal -__-
	if (list.user.toString() !== user!.id.toString()) {
		throw new NotAuthorizedError();
	}
	await list.delete();

	// publisher here
	new ListDeletedPublisher(natsWrapper.client).publish({
		userId: user!.id,
		listId: list.id,
		name: list.name
	});

	res.status(204).send();
});

export { router as deleteListRouter };
