import { createList, getUserCookies } from './helper-functions';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 200 with a list that exists', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const res = await request(app).get(`/api/lists/${list.id}`).expect(200);

	expect(res.body.id).toEqual(list.id);
});

it('returns 404 for id that doesnt exist', async () => {
	await request(app).get('/api/lists/3456').expect(404);
});
