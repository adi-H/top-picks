import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';
import { User } from '../../models/user';

it('returns a 201 on successful signup', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
			accessLevel: 'admin'
		})
		.expect(201);
	done();
});

it('returns a 201 on successful signup without accessLevel', (done) => {
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
			password: 'password',
			accessLevel: 'admin'
		})
		.expect(400);
	done();
});

it('returns 400 with invalid passsword', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'a',
			accessLevel: 'admin'
		})
		.expect(400);
	done();
});

it('returns 400 with missing email + password', (done) => {
	request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			accessLevel: 'admin'
		})
		.expect(400)
		.then(() => {
			request(app)
				.post('/api/users/signup')
				.send({
					password: 'password',
					accessLevel: 'admin'
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
			password: 'password',
			accessLevel: 'admin'
		})
		.expect(201);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('userAccess stays admin on valid req', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
			accessLevel: 'admin'
		})
		.expect(201);

	const user = await User.find({ email: 'test@test.com' });
	// theres only one user in the db, can assume its 1 out of the []
	expect(user[0].userAccess).toEqual('admin');
});

it('userAccess stays viewer on valid req', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
			accessLevel: 'viewer'
		})
		.expect(201);

	const user = await User.find({ email: 'test@test.com' });
	// theres only one user in the db, can assume its 1 out of the []
	expect(user[0].userAccess).toEqual('viewer');
});

it('invalid userAccess on valid req, get changed to "~"', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
			accessLevel: 'blah'
		})
		.expect(201);

	const user = await User.find({ email: 'test@test.com' });
	// theres only one user in the db, can assume its 1 out of the []
	expect(user[0].userAccess).toEqual('~');
});

it('userAccess not mentioned on valid req, get changed to "~"', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	const user = await User.find({ email: 'test@test.com' });
	// theres only one user in the db, can assume its 1 out of the []
	expect(user[0].userAccess).toEqual('~');
});
