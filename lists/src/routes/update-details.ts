import { NotAuthorizedError } from './../errors/not-authorized-error';
import { ListDeletedPublisher } from '@adih-toppicks/common';
import { BadRequestError } from './../errors/bad-request-error';
import { NotFoundError } from './../errors/not-found-error';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { List } from '../models/lists';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { natsWrapper } from '../nats-wrapper';
import sanitize from 'mongo-sanitize';

const router = express.Router();

const listValidationRules = () => {
	return [
		body('name').notEmpty().isString().withMessage('list name must be a string').optional({ nullable: true }),
		body('description')
			.notEmpty()
			.isString()
			.withMessage('if description exists, it must be a not empty string')
			.optional({ nullable: true })
	];
};

router.post(
	'/api/lists/:id',
	requireAuth,
	listValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		let list;
		try {
			list = await List.findById(sanitize(req.params.id)).populate('user');
			if (!list) {
				throw new NotFoundError();
			}
		} catch (e) {
			throw new NotFoundError();
		}

		const user = await User.findById(req.sessionInfo!.id);
		if (!Object.is(user!._id, list.user._id)) {
			throw new NotAuthorizedError();
		}

		let updatedList = { ...list, ...sanitize(req.body) };
		try {
			await list.set(updatedList);
			await list.save();
		} catch (e) {
			throw new BadRequestError('oh no something went wrong whoops ~~');
		}

		// publisher here
		new ListDeletedPublisher(natsWrapper.client).publish({
			userId: list.user.id,
			listId: list.id,
			name: list.name
		});

		res.status(201).send(list);
	}
);

export { router as updateListDetailsRouter };
