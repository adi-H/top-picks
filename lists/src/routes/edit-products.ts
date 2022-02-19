import { ProductDoc } from './../models/product';
import { NotAuthorizedError } from './../errors/not-authorized-error';
import { ListDeletedPublisher } from '../events/publishers/list-deleted-publisher';
import { BadRequestError } from './../errors/bad-request-error';
import { NotFoundError } from './../errors/not-found-error';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { List } from '../models/lists';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { NewListCreatedPublisher } from '../events/publishers/new-list-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Product } from '../models/product';
import { ProductCountInListUpdatedPublisher } from '../events/publishers/list-products-count-updated-publisher';

interface UserGivenProduct {
	id: string;
	dissociate: boolean;
}

function instanceOfUserGivenProduct(obj: any): obj is UserGivenProduct {
	return 'id' in obj && 'dissociate' in obj;
}

interface UserProducts extends Array<UserGivenProduct> {}

interface ProductsList {
	[key: string]: ProductDoc;
}

const validateProducts = async (products: object[]) => {
	/** add only the products that exist; if id doesnt exist ignore it */
	let validProducts: ProductsList = {};
	for (const product of products) {
		if (instanceOfUserGivenProduct(product)) {
			const p = await Product.findById(product.id);
			if (p) {
				validProducts[product.id] = p;
			}
		}
	}
	// console.log('valid products post loop -- ', validProducts);

	return validProducts;
};

const listValidationRules = () => {
	return [
		body('products')
			.exists()
			.withMessage('u gotta have a products field')
			.isArray()
			.withMessage('products must be an array')
	];
};

const router = express.Router();

router.put(
	'/api/lists/:id',
	requireAuth,
	listValidationRules(),
	validateRequest,
	async (req: Request, res: Response) => {
		let list;
		try {
			list = await List.findById(req.params.id).populate('user');
			if (!list) {
				throw new NotFoundError();
			}
		} catch (e) {
			throw new NotFoundError();
		}

		console.log(list);
		const user = await User.findById(req.sessionInfo!.id);
		if (!Object.is(user!._id, list.user._id)) {
			throw new NotAuthorizedError();
		}

		const validProducts: ProductsList = await validateProducts(req.body.products);

		// let newListObj = Object.assign({}, list);
		let currentProds = list.products;

		let validProductId: keyof typeof validProducts;
		for (validProductId in validProducts) {
			// console.log(`checking for prod ${String(validProductId)}`);
			const dissociateProduct = req.body.products.filter((p: UserGivenProduct) => p.id === validProductId)[0]
				.dissociate;

			if (dissociateProduct) {
				const indexOfProduct = list.products.indexOf(validProducts[validProductId]);
				currentProds.splice(indexOfProduct, 1);
			} else {
				currentProds.push(validProducts[validProductId]);
			}
		}

		// console.log('pre save @@@@@@@@2', list);
		await list.set({ products: currentProds });
		await list.save();
		console.log('sending this back ~~~~~~', list);

		// publisher here
		new ProductCountInListUpdatedPublisher(natsWrapper.client).publish({
			userId: list.user.id,
			listId: list.id,
			count: list.products.length
		});

		res.status(201).send(list);
	}
);

export { router as editListProductsRouter };
