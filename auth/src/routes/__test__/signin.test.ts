import request from 'supertest';
import { app } from '../../app';

it('fails when email doesnt exist', (done) => {
	request(app)
		.post('/api/users/signin')
		.send({
			email: '12345678iokjhgfd',
			password: 'password'
		})
		.expect(400);
	done();
});

it('fails when invalid passsword', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201)
		.then(() => {
			request(app)
				.post('/api/users/signup')
				.send({
					email: 'test@test.com',
					password: 'a'
				})
				.expect(400)
				.then(() => {
					done();
				});
		});
});

it('responds with a cookie when given valid credentials', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	const response = await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(200);

	expect(response.get('Set-Cookie')).toBeDefined();
});
