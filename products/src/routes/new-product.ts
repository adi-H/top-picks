import { bestForTagsOptions } from './../variables/best-for-tags';
import { BrandDoc } from './../models/brand';
import { validateRequest } from './../middlewares/validate-request';
import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Brand } from '../models/brand';
import { BadRequestError } from '../errors/bad-request-error';
import { Product } from '../models/product';
import { productCreatedPublisher } from '@adih-toppicks/common';
import { natsWrapper } from '../nats-wrapper';
import multer from 'multer';
import { fileStorage } from '../file-upload/storage-config';
import { fileFilter } from '../file-upload/file-filter';
import { ProductImg } from '../models/productImg';
import { possibleProductTypes } from '../variables/product-types';
import sanitize from 'mongo-sanitize';

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const router = express.Router();

const productValidationRules = () => {
	return [
		body('name').not().isEmpty().withMessage('name is required'),
		body('productType').not().isEmpty().withMessage('productType is required'),
		// .optional({ nullable: true, checkFalsy: true }),
		body('brand').not().isEmpty().withMessage('brand is required'),
		body('description').not().isEmpty().withMessage('productType is required'),
		body('bestForTags')
			.not()
			.isEmpty()
			.withMessage('bestfortags cant be empty')
			.exists() // .isString()
			// .toArray() // .isArray()
			.withMessage('best for tags must be an array')
	];
};

router.post(
	'/api/products',
	upload.single('productImg'),
	productValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		let { name, productType, brand: brandId, description, bestForTags } = sanitize(req.body);
		// let name = sanitize(req.body.name);

		// console.log('req.file ', req.file);
		if (!req.file) {
			console.log('failed img is missing');
			throw new BadRequestError('img is missing');
		}
		if (!possibleProductTypes.includes(productType.toLowerCase())) {
			throw new BadRequestError(`product type ${productType} doesnt exist ~~`);
		}

		let brandObj: BrandDoc | null;
		try {
			brandObj = await Brand.findById(brandId);
			if (!brandObj) {
				throw new BadRequestError('brand doesnt exist');
			}
		} catch (e) {
			throw new BadRequestError('brand doesnt exist');
		}

		const doesProductExist = await Product.findOne({ name });
		if (doesProductExist) {
			throw new BadRequestError('product already exists');
		}

		// validate the bestForTags
		console.log(Object.prototype.toString.call(bestForTags));
		if (Object.prototype.toString.call(bestForTags) === '[object String]') {
			try {
				bestForTags = bestForTags.split(',');
			} catch (e) {
				throw new BadRequestError('wrong bestForTags type');
			}
		} else if (Object.prototype.toString.call(bestForTags) !== '[object Array]') {
			throw new BadRequestError('wrong bestForTags type');
		}
		const tagsFiltered = bestForTags.filter((tag: string) => bestForTagsOptions.includes(tag));
		if (tagsFiltered.length !== bestForTags.length) {
			throw new BadRequestError('bestForTags includes invalid values');
		}

		// // these lines are for the diskStorage option which is commented out cause i dont fucking need it
		// // didn't work anyway
		// var imgSync = fs.readFileSync(req.file.path);
		// var encode_img = imgSync.toString('base64');
		// const img = ProductImg.build({
		// 	buff: Buffer.from(encode_img, 'base64')
		// });
		// await img.save();
		// console.log(img);

		// BANDAID -- this converts the file buffer to utf8 string and saves it
		// i dunno why this works but it saves something so like what do i fucking know
		// TODO fix this ??
		// BANDAID #2 saves the buffer as binary so it can be like brought back from binary easily later
		// https://stackoverflow.com/a/67063067
		const img = ProductImg.build({
			buff: req.file.buffer.toString('binary'),
			fileName: req.file.filename
		});
		await img.save();
		// console.log(img);

		// console.log('creating product');

		const product = await Product.build({
			name,
			brand: brandObj,
			productType,
			avgRating: 0,
			productImg: img._id,
			description,
			bestForTags: tagsFiltered,
			numberOfRatings: 0
		});
		await product.save();

		// console.log(product);
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
