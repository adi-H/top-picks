import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
	var signin: (id?: string) => string[];
}

// PLEASE NOTE THIS -- BUGFIX / BANDAID
// // https://stackoverflow.com/a/68469945
// // https://github.com/visionmedia/supertest/issues/520
// seems to be an open issue
// but adding a force exit worked and i dont wanna keep working on this
// so to be fixed sometime in the future i dunno

jest.mock('../nats-wrapper');

jest.useFakeTimers('legacy');

let mongo: any;

beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';

	mongo = new MongoMemoryServer();
	await mongo.start();

	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	} as ConnectOptions);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = (id?: string) => {
	console.log(id);
	let token;
	if (id) {
		token = jwt.sign(
			{
				id: id,
				email: 'test@test.com'
			},
			process.env.JWT_KEY!
		);
	} else {
		token = jwt.sign(
			{
				id: new mongoose.Types.ObjectId().toHexString(),
				email: 'test@test.com'
			},
			process.env.JWT_KEY!
		);
	}

	const sessionJson = JSON.stringify({ jwt: token });
	const base64 = Buffer.from(sessionJson).toString('base64');

	return [ `express:sess=${base64}` ];
	// session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4WldVNE9Ea3lNVGt5TXpsaE9EaGxOMlJsWkRreVlTSXNJbVZ0WVdsc0lqb2lkR1Z6ZEVCMFpYTjBMbU52YlNJc0ltbGhkQ0k2TVRZME16QXlNalE0TW4wLm15TzdaOEM4c3BEV0YwWVBmWGVmZ1RrdGlBQldvVFY3ZE9lbC1CQVlmZVEifQ==; path=/; httponly
	// return [ `express=${base64}; path=/; httponly` ];
};
