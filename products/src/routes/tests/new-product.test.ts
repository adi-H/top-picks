import request from 'supertest';
import { app } from '../../app';
import { Brand } from '../../models/brand';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

const createBrand = async () => {
	const brand = Brand.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toHexString()
	});
	await brand.save();
	return brand;
};

it('return 201 on successful input', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.send({
			name: 'test',
			productType: 'blahblah',
			brand: brand.id
		})
		.expect(201);
});

it('return 400 with missing inputs', async () => {
	await request(app).post('/api/products').expect(400);
});

it('return 400 with missing name', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.send({
			type: 'blahblah',
			productType: brand.id
		})
		.expect(400);
});

it('return 400 with missing product type', async () => {
	const brand = await createBrand();
	const res = await request(app)
		.post('/api/products')
		.send({
			name: 'test',
			productType: brand.id
		})
		.expect(400);
});

it('return 400 with missing brand id', async () => {
	await request(app)
		.post('/api/products')
		.send({
			name: 'test',
			productType: 'blahblah'
		})
		.expect(400);
});

it('return 400 with brand id that doesnt exist', async () => {
	await request(app)
		.post('/api/products')
		.send({
			name: 'test',
			productType: 'blahblah',
			brand: new mongoose.Types.ObjectId().toHexString()
		})
		.expect(400);
});

it('return 400 with name that already exists', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.send({
			name: 'test123',
			productType: 'blahblah12',
			brand: brand.id
		})
		.expect(201);

	await request(app)
		.post('/api/products')
		.send({
			name: 'test123',
			productType: 'blahblah123',
			brand: brand.id
		})
		.expect(400);
});

it('emits a new product event', async () => {
	const brand = await createBrand();
	await request(app)
		.post('/api/products')
		.send({
			name: 'test',
			productType: 'blahblah',
			brand: brand.id
		})
		.expect(201);
	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
