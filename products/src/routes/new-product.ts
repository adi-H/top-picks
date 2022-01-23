import { validateRequest } from './../middlewares/validate-request';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Brand } from '../models/brand';
import { BadRequestError } from '../errors/bad-request-error';
import { Product } from '../models/product';

const router = express.Router();

const productValidationRules = () => {
	return [
		body('name').not().isEmpty().withMessage('name is required'),
		body('productType').not().isEmpty().withMessage('productType is required'),
		body('brand').not().isEmpty().withMessage('brand is required')
	];
};

router.post('/api/products', productValidationRules(), validateRequest, async (req: Request, res: Response) => {
	const { name, productType, brand: brandId } = req.body;
	console.log('starting~~');
	// check if brand exists
	const brandObj = await Brand.findById(brandId);
	if (!brandObj) {
		throw new BadRequestError('brand doesnt exist');
	}

	// check if product already exists
	const doesProductExist = await Product.findOne({ name });
	if (doesProductExist) {
		throw new BadRequestError('product already exists');
	}

	console.log('trying to save prod!!');
	const product = Product.build({
		name,
		brand: brandId,
		productType,
		avgRating: 0
	});
	await product.save();

	res.status(201).send(product);

	// res.send('pong');
});

export { router as newProductRouter };
