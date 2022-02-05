import request from 'supertest';
import { app } from '../../app';
import { Brand } from '../../models/brand';
import mongoose from 'mongoose';

const createBrand = async () => {
	const brand = Brand.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toString()
	});
	await brand.save();
	return brand;
};

const testImgPath = './../../__mocks__/alien.png';
const createProduct = async (name: string, type: string) => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('productType', 'blahblah')
		.field('brand', brand.id)
		.attach('productImg', __dirname + testImgPath)
		.expect(201);

	return res;
};

it('returns 200 with valid product details', async () => {
	const res = await createProduct('test', 'testtype');

	const details = await request(app).get(`/api/products/${res.body.id}`).expect(200);

	expect(details.body.id).toEqual(res.body.id);
	expect(details.body.name).toEqual(res.body.name);
	expect(details.body.description).toEqual(res.body.description);
});

it('returns 404 with invalid product id', async () => {
	await request(app).get(`/api/products/456`).expect(404);
});

// it('returns ', async () => {});
// it('', async () => {});
// it('', async () => {});
// it('', async () => {});
// it('', async () => {});
