import { natsWrapper } from '../../nats-wrapper';
import { List } from '../../models/lists';
import request from 'supertest';
import { app } from '../../app';
import { getUserCookies } from './helper-functions';

it('201 with all valid inputs + creates said list', async () => {
	const cookie = await getUserCookies();
	const res = await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 'blah',
			description: 'blah blah desc desc'
		})
		.expect(201);

	// console.log(res.body);
	const list = await List.findById(res.body.id);
	expect(list).toBeDefined();
});

it('401 with no user token', async () => {
	await request(app).post('/api/lists').send().expect(401);
});

it('401 with user id that doesnt exist', async () => {
	await request(app).post('/api/lists').set('Cookie', global.signin()).send().expect(401);
});

it('400 with empty req body', async () => {
	const cookie = await getUserCookies();
	await request(app).post('/api/lists').set('Cookie', cookie).send().expect(400);
});

it('400 with missing name', async () => {
	const cookie = await getUserCookies();
	await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			description: 'blah'
		})
		.expect(400);
});

it('400 with invalid name type (numerical)', async () => {
	const cookie = await getUserCookies();
	await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 12345
		})
		.expect(400);
});

it('400 with empty name', async () => {
	const cookie = await getUserCookies();
	await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: ''
		})
		.expect(400);
});

it('201 without a description', async () => {
	const cookie = await getUserCookies();
	await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 'blah'
		})
		.expect(201);
});

it('400 with invalid description format (numerical)', async () => {
	const cookie = await getUserCookies();
	await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 'test',
			description: 1234
		})
		.expect(400);
});

it('400 with empty description', async () => {
	const cookie = await getUserCookies();
	await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 'test',
			description: ''
		})
		.expect(400);
});

it('emits a published list event', async () => {
	const cookie = await getUserCookies();
	await request(app)
		.post('/api/lists')
		.set('Cookie', cookie)
		.send({
			name: 'blah',
			description: 'blah blah desc desc'
		})
		.expect(201);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
// it('', async () => {});
// it('', async () => {});
// it('', async () => {});
