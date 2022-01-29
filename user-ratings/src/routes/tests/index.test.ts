import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Product } from '../../models/product';
import { User } from '../../models/user';

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

it('returns 200 with a valid product in db', async () => {
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

	const res = await request(app).get('/api/user-ratings').expect(200);
	expect(res.body).toHaveLength(1);
});

it('returns 200 with empty body (nothing in db)', async () => {
	const res = await request(app).get('/api/user-ratings').expect(200);
	expect(res.body).toHaveLength(0);
});
