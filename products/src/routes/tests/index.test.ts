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

it('returns 200 with a valid product in db', async () => {
	const brand = await createBrand();

	await request(app)
		.post('/api/products')
		.send({
			name: 'test',
			productType: 'adkjsd',
			brand: brand.id
		})
		.expect(201);

	const res = await request(app).get('/api/products').expect(200);
	expect(res.body).toHaveLength(1);
});

it('returns 200 with empty body (nothing in db)', async () => {
	const res = await request(app).get('/api/products').expect(200);
	expect(res.body).toHaveLength(0);
});
