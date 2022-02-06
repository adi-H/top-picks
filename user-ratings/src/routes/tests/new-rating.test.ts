import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { natsWrapper } from '../../nats-wrapper';

const createProduct = async () => {
	const product = Product.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toHexString(),
		avgRating: 3
	});
	await product.save();
	return product;
};

const createUser = async () => {
	const user = User.build({
		email: 'test@test.com',
		_id: new mongoose.Types.ObjectId().toHexString()
	});

	await user.save();
	return user;
};

it('returns a 201 with valid rating', async () => {
	const product = await createProduct();
	const u = await createUser();
	const cookie = global.signin(u.id);
	// console.log('printing cookie', cookie);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 2,
			product: product.id,
			description: 'blah blah blah desc'
		})
		.expect(201);
});

it('returns a 201 with valid rating without desc', async () => {
	const product = await createProduct();
	const u = await createUser();
	const cookie = global.signin(u.id);
	// console.log('printing cookie', cookie);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 2,
			product: product.id
		})
		.expect(201);
});

it('returns 400 with missing product id', async () => {
	const cookie = global.signin((await createUser()).id);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 2,
			description: 'blah blah blah desc'
		})
		.expect(400);
});

it('returns 400 with product id that doesnt exist', async () => {
	const cookie = global.signin((await createUser()).id);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			product: new mongoose.Types.ObjectId().toHexString(),
			rating: 3,
			description: 'blah blah blah desc'
		})
		.expect(400);
});

it('returns 401 not authenticated user', async () => {
	const product = await createProduct();
	await request(app)
		.post('/api/user-ratings')
		.send({
			product: product.id,
			rating: 3,
			description: 'blah blah blah desc'
		})
		.expect(401);
});

it('returns 401 with user id that doesnt exist', async () => {
	const product = await createProduct();
	const cookie = global.signin(new mongoose.Types.ObjectId().toHexString());
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 2,
			product: product.id,
			description: 'blah blah blah desc'
		})
		.expect(401);
});

// it('returns 400 for a rating that already exists', async () => {
// 	const product = await createProduct();

// 	const cookie = global.signin((await createUser()).id);
// 	await request(app)
// 		.post('/api/user-ratings')
// 		.set('Cookie', cookie)
// 		.send({
// 			rating: 2,
// 			product: product.id
// 		})
// 		.expect(201);

// 	await request(app)
// 		.post('/api/user-ratings')
// 		.set('Cookie', cookie)
// 		.send({
// 			rating: 3,
// 			product: product.id
// 		})
// 		.expect(400);
// });

it('returns 400 with a rating that isnt numeric', async () => {
	const product = await createProduct();
	const cookie = global.signin((await createUser()).id);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 'addasd',
			product: product.id,
			description: 'blah blah blah desc'
		})
		.expect(400);
});

it('returns 400 with a rating that is negative', async () => {
	const product = await createProduct();
	const cookie = global.signin((await createUser()).id);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: -3,
			product: product.id,
			description: 'blah blah blah desc'
		})
		.expect(400);
});

it('returns 400 with valid rating that is 5+', async () => {
	const product = await createProduct();
	const cookie = global.signin((await createUser()).id);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 7,
			product: product.id,
			description: 'blah blah blah desc'
		})
		.expect(400);
});

it('emits a product rating updated event', async () => {
	const product = await createProduct();
	const cookie = global.signin((await createUser()).id);
	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 2,
			product: product.id,
			description: 'blah blah blah desc'
		})
		.expect(201);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
