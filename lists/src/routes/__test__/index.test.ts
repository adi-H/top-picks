import { createList, getUserCookies } from './helper-functions';
import request from 'supertest';
import { app } from '../../app';

it('returns 200 with a valid list in db', async () => {
	const cookie = await getUserCookies();
	const list = await createList(cookie);
	const res = await request(app).get('/api/lists').expect(200);
	expect(res.body).toHaveLength(1);
});

it('returns 200 with empty body (nothing in db)', async () => {
	const res = await request(app).get('/api/lists').expect(200);
	expect(res.body).toHaveLength(0);
});
