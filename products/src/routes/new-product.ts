import { validateRequest } from './../middlewares/validate-request';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Brand } from '../models/brand';
import { BadRequestError } from '../errors/bad-request-error';
import { Product } from '../models/product';
import { productCreatedPublisher } from '../events/publishers/product-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import multer from 'multer';
import { fileStorage } from '../file-upload/storage-config';
import { fileFilter } from '../file-upload/file-filter';

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const router = express.Router();

const productValidationRules = () => {
	return [
		body('name').not().isEmpty().withMessage('name is required'),
		body('productType').not().isEmpty().withMessage('productType is required'),
		// .optional({ nullable: true, checkFalsy: true }),
		body('brand').not().isEmpty().withMessage('brand is required')
	];
};

router.post(
	'/api/products',
	upload.single('productImg'),
	productValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		const { name, productType, brand: brandId } = req.body;

		console.log(req.file);
		if (!req.file) {
			throw new BadRequestError('img is missing');
		}
		// console.log(req.file.buffer);

		// check if brand exists
		try {
			const brandObj = await Brand.findById(brandId);
			if (!brandObj) {
				throw new BadRequestError('brand doesnt exist');
			}
		} catch (e) {
			throw new BadRequestError('brand doesnt exist');
		}

		// check if product already exists
		const doesProductExist = await Product.findOne({ name });
		if (doesProductExist) {
			throw new BadRequestError('product already exists');
		}

		const product = await Product.build({
			name,
			brand: brandId,
			productType,
			avgRating: 0,
			productImg: req.file.buffer
		});
		await product.save();

		console.log(product);
		new productCreatedPublisher(natsWrapper.client).publish({
			id: product.id,
			name: product.name,
			productType: product.productType,
			avgRating: product.avgRating,
			brandId: brandId
		});

		res.status(201).send(product);
	}
);

export { router as newProductRouter };
