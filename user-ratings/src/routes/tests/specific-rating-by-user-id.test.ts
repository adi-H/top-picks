import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { createProduct, createUser } from './generic-functions';

it('returns 200 with only the rating thats by the user thats requested', async () => {
	const product = await createProduct();
	const userOne = await createUser('test@test.com');
	const userTwo = await createUser('test@test.com');
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

	const res = await request(app).get(`/api/user-ratings/product/${product.id}/user/${userTwo.id}`).expect(200);

	expect(res.body.id).toEqual(ratingTwo.body.id);
	expect(res.body).toBeInstanceOf(Object);
});

it('returns 404 with a userid that doesnt exist (product ok)', async () => {
	const product = await createProduct();
	await request(app).get(`/api/user-ratings/product/${product.id}/user/54321`).expect(404);
});

it('returns 404 with a productId that doesnt exist (user ok)', async () => {
	const user = await createUser('test@test.com');
	await request(app).get(`/api/user-ratings/product/12345/user/${user.id}`).expect(404);
});

it('returns 404 with a productId + userid that doesnt exist', async () => {
	await request(app).get(`/api/user-ratings/product/12345/user/98765`).expect(404);
});

it('returns 200 with an empty rating for userid that doesnt have ratings', async () => {
	const user = await createUser('test@test.com');
	const product = await createProduct();
	const res = await request(app).get(`/api/user-ratings/product/${product.id}/user/${user.id}`).expect(200);
	expect(res.body).toStrictEqual({}); // returns an empty object
});
