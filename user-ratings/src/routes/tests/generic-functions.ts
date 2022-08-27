import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { Product } from '../../models/product';

export const createUser = async (email: string) => {
	const user = User.build({
		email: email,
		_id: new mongoose.Types.ObjectId().toHexString()
	});

	await user.save();
	return user;
};

export const createProduct = async () => {
	const product = Product.build({
		name: 'blah',
		id: new mongoose.Types.ObjectId().toHexString(),
		avgRating: 3
	});
	await product.save();
	return product;
};

export const getUserCookie = async (email: string = 'test@test.com') => {
	const u = await createUser(email);
	return global.signin(u.id);
};

export const createRating = async (rating: Number = 5, description: String = '123 desc hehe', cookie: string[]) => {
	const product = await createProduct();
	// const cookie = await getUserCookie();

	const ratingRes = await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: rating,
			product: product.id,
			description: description //'blah blah blah desc'
		})
		.expect(201);

	return ratingRes;
};
