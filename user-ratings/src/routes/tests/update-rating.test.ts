import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { getUserCookie, createRating } from './generic-functions';
import { natsWrapper } from '../../nats-wrapper';

it('updates a valid req with valid inputs 201', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookie);

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookie)
		.send({
			rating: 2,
			description: 'blah blah blah desc'
		})
		.expect(201);

	expect(res.body.rating).toEqual(2);
	expect(res.body.description).toEqual('blah blah blah desc');
	expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('updates a valid req without description (only rating changed) 201', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookie);

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookie)
		.send({
			rating: 3
		})
		.expect(201);

	expect(res.body.rating).toEqual(3);
	expect(res.body.description).toEqual('hehe');
});

it('updates a valid req without rating (only desc changed) 201', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookie);

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookie)
		.send({
			description: 'blah blah blah desc'
		})
		.expect(201);

	expect(res.body.rating).toEqual(4);
	expect(res.body.description).toEqual('blah blah blah desc');
});

it('updates a valid req without desc (desc remains empty) 201', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, '', cookie);

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookie)
		.send({
			rating: 2
		})
		.expect(201);

	expect(res.body.rating).toEqual(2);
	expect(res.body.description).toEqual('');
});

it('400 invalid rating - 5+', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookie);

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookie)
		.send({
			rating: 8
		})
		.expect(400);
	expect(res.body.errors[0].message).toEqual('rating cant be specified + under 0 or over 5');
	expect(res.body.errors[0].field).toEqual('rating');
});

it('400 invalid rating - negative', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookie);

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookie)
		.send({
			rating: -2
		})
		.expect(400);
	expect(res.body.errors[0].message).toEqual('rating cant be specified + under 0 or over 5');
	expect(res.body.errors[0].field).toEqual('rating');
});

it('400 invalid rating - not a number', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookie);

	console.log(rating.body);

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookie)
		.send({
			rating: '8'
		})
		.expect(400);
	expect(res.body.errors[0].message).toEqual('rating cant be specified + under 0 or over 5');
	expect(res.body.errors[0].field).toEqual('rating');
});

it('400 rating doesnt exist', async () => {
	const cookie = await getUserCookie();

	await request(app).put(`/api/user-ratings/9765`).set('Cookie', cookie).send().expect(400);
});

it('401 no cookie is attached - user unauthenticated', async () => {
	const cookie = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookie);

	const res = await request(app).put(`/api/user-ratings/${rating.body.id}`).send().expect(401);
	expect(res.body.errors[0].message).toEqual('not authorized');
});

it('401 updating a rating of another user', async () => {
	const cookieOne = await getUserCookie();
	const rating = await createRating(4, 'hehe', cookieOne);
	const cookieTwo = await getUserCookie('otherEmail@gmail.com');

	const res = await request(app)
		.put(`/api/user-ratings/${rating.body.id}`)
		.set('Cookie', cookieTwo)
		.send()
		.expect(401);
	expect(res.body.errors[0].message).toEqual('not authorized for this action');
});

// it('emits publishers', async () => {
// 	const cookie = await getUserCookie();
// 	const rating = await createRating(4, 'hehe', cookie);

// 	const res = await request(app)
// 		.put(`/api/user-ratings/${rating.body.id}`)
// 		.set('Cookie', cookie)
// 		.send({
// 			rating: 2,
// 			description: 'blah blah blah desc'
// 		})
// 		.expect(201);

// 	// expect(natsWrapper.client.publish).toHaveBeenCalled();
// });
