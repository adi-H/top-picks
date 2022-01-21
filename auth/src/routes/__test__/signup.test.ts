import request from 'supertest';
import { app } from '../../app';

// mine
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

// mine
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

// mine
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

// mine
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
