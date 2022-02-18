import { createList, getUserCookies, createUser } from './helper-functions';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 200 only the list from the user id', async () => {
	const userOne = await createUser();
	const userOneCookies = global.signin(userOne.id);
	const userTwoCookies = await getUserCookies();
	const userOneList = await createList(userOneCookies);
	const userTwoList = await createList(userTwoCookies);

	const res = await request(app).get(`/api/lists/user/${userOne.id}`).expect(200);

	expect(res.body).toHaveLength(1);
	expect(res.body[0].id).toEqual(userOneList.id);
});

it('returns 200 ok with empty list for user that doesnt have lists', async () => {
	const user = await createUser();
	const res = await request(app).get(`/api/lists/user/${user.id}`).expect(200);
	expect(res.body).toHaveLength(0);
});

it('returns 404 for userId that doesnt exist', async () => {
	await request(app).get('/api/lists/user/3456').expect(404);
});
