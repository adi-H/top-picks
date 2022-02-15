import request from 'supertest';
import { app } from '../../app';
import { Brand } from '../../models/brand';
import mongoose from 'mongoose';
import path from 'path'

const createBrand = async () => {
	const brand = Brand.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toString()
	});
	await brand.save();
	return brand;
};

const testImgPath = path.resolve(__dirname, './../../__mocks__/alien.png');
const createProduct = async (name: string, type: string) => {
	const brand = await createBrand();
	console.log(testImgPath); 
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.field('bestForTags', [ 'oily skin', 'acne' ])
		.attach('productImg', testImgPath)
		.expect(201);

	return res;
};

it('returns 200 with a valid product in db', async () => {
	const brand = await createBrand();

	await createProduct('test', 'testtype');

	const res = await request(app).get('/api/products').expect(200);
	expect(res.body).toHaveLength(1);
});

it('returns 200 with empty body (nothing in db)', async () => {
	const res = await request(app).get('/api/products').expect(200);
	expect(res.body).toHaveLength(0);
});
