import { natsWrapper } from './../../nats-wrapper';
import { getUserCookies, createList } from './helper-functions';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('emits an event', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	await request(app).delete(`/api/lists/${list.id}`).set('Cookie', cookie).send().expect(204);

	expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
});

it('204 with valid parameters', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	// console.log(list);

	await request(app).delete(`/api/lists/${list.id}`).set('Cookie', cookie).send().expect(204);
});

it('401 with no cookie token', async () => {
	await request(app).delete(`/api/lists/2345678i`).send().expect(401);
});

it('401 deleting another users list', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	// console.log(list);

	await request(app).delete(`/api/lists/${list.id}`).set('Cookie', global.signin()).send().expect(401);
});

it('404 deleting a non existent list', async () => {
	const cookie = await getUserCookies();

	await request(app).delete(`/api/lists/8765`).set('Cookie', cookie).send().expect(404);
});
