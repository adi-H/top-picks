import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// declare global {
// 	var signin: () => Promise<string[]>;
// }

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

// global.signin = async () => {
// 	const email = 'test@test.com';
// 	const password = 'password';

// 	const response = await request(app)
// 		.post('/api/users/signup')
// 		.send({
// 			email,
// 			password
// 		})
// 		.expect(201);

// 	const cookie = response.get('Set-Cookie');

// 	return cookie;
// };
