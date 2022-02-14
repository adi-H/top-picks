import { BrandDoc } from './../models/brand';
import { validateRequest } from './../middlewares/validate-request';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { body } from 'express-validator';
import { NotFoundError } from '../errors/not-found-error';
import { Brand } from '../models/brand';
import { BadRequestError } from '../errors/bad-request-error';
import { productUpdatedPublisher } from '../events/publishers/product-updated-publisher';
import { natsWrapper } from '../nats-wrapper';
import { possibleProductTypes } from '../variables/product-types';
import { bestForTagsOptions } from '../variables/best-for-tags';

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
			.optional({ nullable: true, checkFalsy: true }),
		body('description')
			.notEmpty()
			.withMessage('description cant be specified + empty')
			.optional({ nullable: true, checkFalsy: true }),
		body('bestForTags')
			.not()
			.isEmpty()
			.withMessage('bestfortags cant be empty')
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
			product = await Product.findById(req.params.id).populate('brand');
			if (!product) {
				throw new NotFoundError();
			}
		} catch (e) {
			throw new NotFoundError();
		}

		let reqBody = req.body;
		if (req.body.brand) {
			try {
				const newBrand = await Brand.findById(req.body.brand);
				if (!newBrand) {
					throw new BadRequestError('brand id doesnt exist');
				}
				reqBody = { ...req.body, ...newBrand };
			} catch (e) {
				throw new BadRequestError('brand id doesnt exist');
			}
		}

		if (req.body.productType) {
			// console.log(req.body.productType);
			if (!possibleProductTypes.includes(req.body.productType.toLowerCase())) {
				throw new BadRequestError(`productType ${req.body.productType} doesnt exist ~~`);
			}
		}

		if (req.body.bestForTags) {
			if (!Array.isArray(req.body.bestForTags)) {
				throw new BadRequestError(`bestForTags ${req.body.bestForTags} isnt an array ~~`);
			}
			const tagsFiltered = req.body.bestForTags.filter((tag: string) => bestForTagsOptions.includes(tag));
			reqBody = { ...req.body, ...{ bestForTags: tagsFiltered } };
		}

		let newProduct = { ...product, ...reqBody };
		try {
			await product.set(newProduct);
			await product.save();
		} catch (e) {
			throw new BadRequestError('maybe some of the parameters are wrong~~');
		}

		new productUpdatedPublisher(natsWrapper.client).publish({
			id: product.id,
			name: product.name,
			productType: product.productType,
			avgRating: product.avgRating,
			brandId: product.brand.id
		});

		res.status(201).send(product);
	}
);

export { router as updateProductRouter };
