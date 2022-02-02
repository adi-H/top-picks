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

it('returns 200 with only the rating thats by the user thats requested', async () => {
	const product = await createProduct();
	const userOne = await createUser();
	const userTwo = await createUser();
	const cookieOne = global.signin(userOne.id);
	const cookieTwo = global.signin(userTwo.id);

	await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookieOne)
		.send({
			rating: 2,
			product: product.id
		})
		.expect(201);

	const ratingTwo = await request(app)
		.post('/api/user-ratings')
		.set('Cookie', cookieTwo)
		.send({
			rating: 3,
			product: product.id
		})
		.expect(201);

	const res = await request(app).get(`/api/user-ratings/user/${userTwo.id}`).expect(200);
	expect(res.body).toHaveLength(1);
	expect(res.body[0].id).toEqual(ratingTwo.body.id);
});

it('returns 404 with a userid that doesnt exist', async () => {
	await request(app).get('/api/user-ratings/user/54321').expect(404);
	// expect(res.body).toHaveLength(0);
});

it('returns 200 with an empty list for userid that doesnt have ratings', async () => {
	const user = await createUser();
	const res = await request(app).get(`/api/user-ratings/user/${user.id}`).expect(200);
	expect(res.body).toHaveLength(0);
});
