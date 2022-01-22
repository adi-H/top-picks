import request from 'supertest';
import { app } from '../../app';

it('returns 200 with a valid brand in db', async () => {
	await request(app)
		.post('/api/brands')
		.send({
			name: 'test',
			description: 'adkjhsad asdihsa dlk'
		})
		.expect(201);

	const res = await request(app).get('/api/brands').expect(200);
	expect(res.body).toHaveLength(1);
});

it('returns 200 with empty body (nothing in db)', async () => {
	const res = await request(app).get('/api/brands').expect(200);
	expect(res.body).toHaveLength(0);
});
