import request from 'supertest';
import { app } from '../../app';
import { Brand } from '../../models/brand';
import mongoose from 'mongoose';
import path from 'path';

const createBrand = async () => {
	const brand = Brand.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toString()
	});
	await brand.save();
	return brand;
};

const testImgPath = path.resolve(__dirname, './../../__mocks__/alien.png');
const createProduct = async (name: string = 'test') => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', name)
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.field('bestForTags', [ 'oily skin', 'acne' ])
		.attach('productImg', testImgPath)
		.expect(201);

	// console.log(res);
	return res;
};

it('returns 200 with valid product details', async () => {
	const prodOne = await createProduct('prod1');
	const prodTwo = await createProduct('prod2');

	const details = await request(app).get(`/api/products/brand/${prodOne.body.brand.id}`).expect(200);

	expect(details.body).toHaveLength(1);
	expect(details.body[0].id).toEqual(prodOne.body.id);
	// expect(details.body.id).toEqual(prodOne.body.id);
	// expect(details.body.name).toEqual(prodOne.body.name);
	// expect(details.body.description).toEqual(prodOne.body.description);
});

it('returns 404 with invalid brand id', async () => {
	await request(app).get(`/api/products/brand/456`).expect(404);
});

// it('returns ', async () => {});
// it('', async () => {});
// it('', async () => {});
// it('', async () => {});
// it('', async () => {});
