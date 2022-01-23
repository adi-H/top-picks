import request from 'supertest';
import { app } from '../../app';
import { Brand } from '../../models/brand';
import mongoose from 'mongoose';

const createBrand = async () => {
	const brand = Brand.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toHexString()
	});
	await brand.save();
	return brand;
};

it('returns 200 with valid product details', async () => {
	const brand = await createBrand();

	const res = await request(app)
		.post('/api/products')
		.send({
			name: 'test',
			productType: 'blahblah',
			brand: brand.id
		})
		.expect(201);

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
