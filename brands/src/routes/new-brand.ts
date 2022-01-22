import express, { Request, Response } from 'express';
import { Brand } from '../models/brand';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { BrandCreatedPublisher } from '../events/publishers/brand-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const brandValidationRules = () => {
	return [
		body('name').not().isEmpty().withMessage('name is required'),
		body('description').not().isEmpty().withMessage('description is required')
	];
};

const router = express.Router();

router.post('/api/brands', brandValidationRules(), validateRequest, async (req: Request, res: Response) => {
	const { name, description } = req.body;

	// if it exists already raise BadRequest
	const existingBrand = await Brand.findOne({ name });
	if (existingBrand) {
		throw new BadRequestError('brand already exists with this name!');
	}

	const brand = Brand.build({ name, description });
	await brand.save();

	// EVENTS AND STUFF GO HERE

	new BrandCreatedPublisher(natsWrapper.client).publish({
		id: brand.id,
		name: brand.name,
		description: brand.description
	});

	console.log('brand was created ~~', name);

	res.status(201).send(brand);
});

export { router as newBrandRouter };
