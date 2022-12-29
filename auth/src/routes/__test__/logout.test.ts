import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	const response = await request(app).post('/api/users/logout').send({}).expect(200);

	let jwt =
		response.get('Set-Cookie')[0].toLowerCase() ==
		'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'.toLowerCase();
	let session =
		response.get('Set-Cookie')[0].toLowerCase() ==
		'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'.toLowerCase();

	return expect(jwt || session).toBeTruthy();
});
