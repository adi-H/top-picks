import { User } from '../../models/user';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

export const createList = async (cookie: string[]) => {
	const res = await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 'blah',
			description: 'blah blah desc desc'
		})
		.expect(201);

	return res.body;
};

const createUser = async () => {
	const user = User.build({
		email: 'test@test.com',
		_id: new mongoose.Types.ObjectId().toHexString()
	});

	await user.save();
	return user;
};

export const getUserCookies = async () => {
	const u = await createUser();
	return global.signin(u.id);
};
