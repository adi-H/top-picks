import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current session', async () => {
	const cookie = await global.signin();
	const response = await request(app).get('/api/users/session-info').set('Cookie', cookie).send().expect(200);

	expect(response.body.sessionInfo.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
	const response = await request(app).get('/api/users/session-info').send().expect(200);
	console.log(response.body.sessionInfo);
	expect(response.body.sessionInfo).toEqual(null);
});
