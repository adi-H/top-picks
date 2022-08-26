import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { User } from '../../models/user';

const createUser = async () => {
	const user = User.build({
		email: 'test@test.com',
		_id: new mongoose.Types.ObjectId().toHexString()
	});

	await user.save();
	return user;
};

const getUserCookie = async () => {
	const u = await createUser();
	return global.signin(u.id);
};

// this is the health check test
// cause why not lol
it('updates a valid req with valid inputs', async () => {
	const cookie = await getUserCookie();

	const res = await request(app).put('/api/user-ratings/123456').set('Cookie', cookie).send().expect(201);

	// expect(res.text).toEqual('pong');
});
