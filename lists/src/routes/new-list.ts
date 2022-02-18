import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { List } from '../models/lists';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { NewListCreatedPublisher } from '../events/publishers/new-list-created';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

const listValidationRules = () => {
	return [
		body('name').notEmpty().isString().withMessage('list name must be a string'),
		body('description')
			.notEmpty()
			.isString()
			.withMessage('if description exists, it must be a not empty string')
			.optional({ nullable: true })
		// body('products')
	];
};

router.post('/api/lists', requireAuth, listValidationRules(), validateRequest, async (req: Request, res: Response) => {
	const { name, description = '' } = req.body;
	// console.log(req.body);
	const user = await User.findById(req.sessionInfo!.id);

	const list = await List.build({
		name,
		description,
		user: user!,
		products: []
	});

	await list.save();

	// publisher here
	new NewListCreatedPublisher(natsWrapper.client).publish({
		userId: user!.id,
		listId: list.id,
		name: list.name
	});

	res.status(201).send(list);
});

export { router as newListRouter };
