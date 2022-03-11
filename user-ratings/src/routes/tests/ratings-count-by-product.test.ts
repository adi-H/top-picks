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

it('returns 200 with only the rating thats by the product', async () => {
	const productOne = await createProduct();
	const productTwo = await createProduct();
	const user = await createUser();
	const cookie = global.signin(user.id);

	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 2,
			product: productOne.id,
			description: 'blah blah blah desc'
		})
		.expect(201);

	const ratingTwo = await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookie)
		.send({
			rating: 2,
			product: productTwo.id,
			description: 'blah blah blah desc'
		})
		.expect(201);

	// console.log(ratingTwo.body);
	const res = await request(app).get(`/api/user-ratings/product/count/${productTwo.id}`).expect(200);
	// console.log(res.body);
	// expect(res.body).toHaveLength(1);
	expect(res.body).toEqual({ count: 1 });
});

it('returns 404 with a product that doesnt exist', async () => {
	await request(app).get('/api/user-ratings/product/count/54321').expect(404);
	// expect(res.body).toHaveLength(0);
});
