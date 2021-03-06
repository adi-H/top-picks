import { User } from '../../models/user';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

export const createList = async (cookie: string[]) => {
	const res = await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 'blah',
			description: 'blah blah desc desc'
		})
		.expect(201);

	return res.body;
};

export const createUser = async () => {
	const user = User.build({
		email: 'test@test.com',
		_id: new mongoose.Types.ObjectId().toHexString()
	});

	await user.save();
	return user;
};

export const createProduct = async () => {
	const product = Product.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		name: 'testProd',
		avgRating: 3.5
	});
	await product.save();
	return product;
};

export const getUserCookies = async () => {
	const u = await createUser();
	return global.signin(u.id);
};
