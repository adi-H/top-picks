import request from 'supertest';
import { app } from '../../app';
import { Brand } from '../../models/brand';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import path from 'path'; 

const testImgPath = path.resolve(__dirname, './../../__mocks__/alien.png');

const createBrand = async () => {
	const brand = Brand.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toString()

		// id: new mongoose.Types.ObjectId().toHexString()
	});
	await brand.save();
	return brand;
};

it('return 201 on successful input', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.field('bestForTags', [ 'oily skin', 'acne' ])
		.attach('productImg', testImgPath)
		.expect(201);
});

it('return 400 with missing inputs', async () => {
	await request(app).post('/api/products').expect(400);
});

it('return 400 with missing name', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with missing product type', async () => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('brand', brand.id)
		.field('description', 'blahblah desc')
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with missing bestForTags', async () => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('productType', 'cleanser')
		.field('brand', brand.id)
		.field('description', 'blahblah desc')
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with wrong type bestForTags (String)', async () => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('productType', 'cleanser')
		.field('brand', brand.id)
		.field('description', 'blahblah desc')
		.field('bestForTags', 'blah blah')
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with wrong type bestForTags (numerical)', async () => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('productType', 'cleanser')
		.field('brand', brand.id)
		.field('description', 'blahblah desc')
		.field('bestForTags', 345678)
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with missing desc', async () => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('brand', brand.id)
		.field('productType', 'cleanser')
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with missing brand id', async () => {
	await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('description', 'blahblah desc')
		.field('productType', 'cleanser')
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with brand id that doesnt exist', async () => {
	await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('description', 'blahblah desc')
		.field('productType', 'cleanser')
		.field('brand', new mongoose.Types.ObjectId().toString())
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with productType that doesnt exist', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('description', 'blahblah desc')
		.field('productType', 'sdfghjkl')
		.field('brand', brand.id)
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with name that already exists', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.field('name', 'test123')
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.field('bestForTags', [ 'oily skin', 'acne' ])
		.attach('productImg', testImgPath)
		.expect(201);

	await request(app)
		.post('/api/products')
		.field('name', 'test123')
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.attach('productImg', testImgPath)
		.expect(400);
});

it('return 400 with missing img', async () => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('productType', 'cleanser')
		.field('description', 'blahblah desc')
		.field('brand', brand.id)
		.expect(400);
});

it('returns 400 with wrong file type attached (txt)', async () => {
	const brand = await createBrand();

	const filePath = path.resolve(__dirname, './../../__mocks__/test.txt');

	await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('description', 'blahblah desc')
		.field('productType', 'cleanser')
		.field('brand', brand.id)
		.attach('productImg', filePath)
		.expect(400);
});

it('emits a new product event', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.field('name', 'test')
		.field('description', 'blahblah desc')
		.field('productType', 'cleanser')
		.field('brand', brand.id)
		.field('bestForTags', [ 'oily skin', 'acne' ])
		.attach('productImg', testImgPath)
		.expect(201);
	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
