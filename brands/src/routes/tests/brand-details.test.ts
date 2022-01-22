import request from 'supertest';
import { app } from '../../app';

it('returns 200 with valid brand details', async () => {
	const res = await request(app)
		.post('/api/brands')
		.send({
			name: 'test',
			description: 'adkjhsad asdihsa dlk'
		})
		.expect(201);

	const details = await request(app).get(`/api/brands/${res.body.id}`).expect(200);

	expect(details.body.id).toEqual(res.body.id);
	expect(details.body.name).toEqual(res.body.name);
	expect(details.body.description).toEqual(res.body.description);
});

it('returns 404 with invalid brand id', async () => {
	await request(app).get(`/api/brands/456`).expect(404);
});

// it('returns ', async () => {});
// it('', async () => {});
// it('', async () => {});
// it('', async () => {});
// it('', async () => {});
