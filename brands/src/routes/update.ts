import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Brand } from '../models/brand';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { natsWrapper } from '../nats-wrapper';
import { BrandUpdatedPublisher } from '../events/publishers/brand-updated-publisher';

const brandValidationRules = () => {
	return [
		body('name').not().isEmpty().withMessage('name is required'),
		body('description').not().isEmpty().withMessage('description is required')
	];
};

const router = express.Router();

router.put('/api/brands/:id', brandValidationRules(), validateRequest, async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;

		const brand = await Brand.findById(req.params.id);
		if (!brand) {
			throw new NotFoundError();
		}

		await brand.set({
			name: name,
			description: description
		});
		await brand.save();

		// events and stuff here
		new BrandUpdatedPublisher(natsWrapper.client).publish({
			id: brand.id,
			name: brand.name,
			description: brand.description
		});

		res.status(201).send(brand);
	} catch (e) {
		throw new NotFoundError();
	}
});

export { router as updateBrandRouter };
