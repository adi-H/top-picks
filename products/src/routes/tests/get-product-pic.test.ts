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

const testImgPath = __dirname + './../../__mocks__/alien.png';
const createProduct = async (name: string, type: string) => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', name)
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.attach('productImg', testImgPath)
		.expect(201);

	return res;
};

it('returns 200 with pic of product that exists', async () => {
	const product = await createProduct('test', 'testtype');

	const res = await request(app).get(`/api/products/img/${product.body.productImg}`).expect(200);

	expect(res.headers['content-type']).toBe('image/png');
	// expect(res.body).toEqual(Buffer.from(__dirname + testImgPath));
});

it('returns 404 for picId that doesnt exist', async () => {});

// it('returns ', async () => {});
