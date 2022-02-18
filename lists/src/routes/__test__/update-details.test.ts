import { createList, getUserCookies } from './helper-functions';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 201 with a valid list update (name update)', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const res = await request(app)
		.post(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			name: 'test2'
		})
		.expect(201);

	expect(res.body.id).toEqual(list.id);
	expect(res.body.name).toEqual('test2');
});

it('returns 201 with a valid list update (desc update)', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const res = await request(app)
		.post(`/api/lists/${list.id}`)
		.set('Cookie', cookie)
		.send({
			description: 'desc test2'
		})
		.expect(201);

	expect(res.body.id).toEqual(list.id);
	expect(res.body.description).toEqual('desc test2');
});

it('401 for no user token', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);

	await request(app).post(`/api/lists/${list.id}`).expect(401);
});

it('401 for trying to edit another users list', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const otherCookie = await getUserCookies();

	await request(app)
		.post(`/api/lists/${list.id}`)
		.set('Cookie', otherCookie)
		.send({
			desc: 'desc test2'
		})
		.expect(401);
});

it('returns 404 for id that doesnt exist', async () => {
	const cookie = await getUserCookies();

	await request(app).post('/api/lists/3456').set('Cookie', cookie).expect(404);
});
