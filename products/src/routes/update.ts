import { validateRequest } from './../middlewares/validate-request';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { body } from 'express-validator';
import { NotFoundError } from '../errors/not-found-error';
import { Brand } from '../models/brand';
import { BadRequestError } from '../errors/bad-request-error';
import { CustomError } from '../errors/custom-error';
import { productUpdatedPublisher } from '../events/publishers/product-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const productUpdateValidationRules = () => {
	return [
		body('name').notEmpty().withMessage('name cant be empty').optional({ nullable: true, checkFalsy: true }),
		body('productType')
			.notEmpty()
			.withMessage('productType cant be specified + empty')
			.optional({ nullable: true, checkFalsy: true }),
		body('brand')
			.notEmpty()
			.withMessage('brand cant be specified + empty')
			.optional({ nullable: true, checkFalsy: true }),
		body('avgRating')
			.notEmpty()
			.isFloat({ min: 0, max: 5 })
			.withMessage('rating cant be specified + under 0 or over 5')
			.optional({ nullable: true, checkFalsy: true })
	];
};

const router = express.Router();

// find somehow to validate each part of the product (the user doesnt have to bring
// submit all fields if they're staying the same) but u still need to validate the input
// maybe enum of sorts or somthin :? TODO

router.put(
	'/api/products/:id',
	productUpdateValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		let product;
		try {
			product = await Product.findById(req.params.id);
			if (!product) {
				throw new NotFoundError();
			}
		} catch (e) {
			throw new NotFoundError();
		}

		if (req.body.brand) {
			try {
				const newBrand = await Brand.findById(req.body.brand);
				if (!newBrand) {
					throw new BadRequestError('brand id doesnt exist');
				}
			} catch (e) {
				throw new BadRequestError('brand id doesnt exist');
			}
		}

		const newProduct = { ...product, ...req.body };
		try {
			await product.set(newProduct);
			await product.save();
		} catch (e) {
			throw new BadRequestError('maybe some of the parameters are wrong~~');
		}

		// new productUpdatedPublisher(natsWrapper.client).publish({
		// 	id: product.id,
		// 	name: product.name,
		// 	productType: product.productType,
		// 	avgRating: product.avgRating,
		// 	brandId: product.brand.id
		// });

		res.status(201).send(product);
	}
);

export { router as updateProductRouter };
