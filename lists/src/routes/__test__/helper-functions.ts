import { User } from '../../models/user';
import mongoose from 'mongoose';

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
