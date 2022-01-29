import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 201 on successful signup', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);
	done();
});

it('returns 400 with invalid email', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: '12345678iokjhgfd',
			password: 'password'
		})
		.expect(400);
	done();
});

it('returns 400 with invalid passsword', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'a'
		})
		.expect(400);
	done();
});

it('returns 400 with missing email + password', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com'
		})
		.expect(400)
		.then(() => {
			request(app)
				.post('/api/users/signup')
				.send({
					password: 'password'
				})
				.expect(400)
				.then(() => {
					done();
				});
		});
});

it('emits a user created event', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
