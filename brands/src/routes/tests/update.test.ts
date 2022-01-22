import request from 'supertest';
import { app } from '../../app';

const createBrand = async (name: string, desc: string) => {
	const res = await request(app)
		.post('/api/brands')
		.send({
			name: name,
			description: desc
		})
		.expect(201);
	return res;
};

it('return 201 and update ok', async () => {
	const brandCreationDetails = await createBrand('test', 'test desc');

	const res = await request(app)
		.put(`/api/brands/${brandCreationDetails.body.id}`)
		.send({
			name: 'test2',
			description: 'desc'
		})
		.expect(201);

	expect(res.body.name).toEqual('test2');
	expect(res.body.description).toEqual('desc');
	expect(res.body.id).toEqual(brandCreationDetails.body.id);
});

it('return 404 if brand id doesnt exist', async () => {
	await request(app)
		.put(`/api/brands/123`)
		.send({
			name: 'test2',
			description: 'desc'
		})
		.expect(404);
});

it('return 400 if name invalid', async () => {
	const brandCreationDetails = await createBrand('test', 'test desc');

	await request(app)
		.put(`/api/brands/${brandCreationDetails.body.id}`)
		.send({
			description: 'desc'
		})
		.expect(400);
});

it('return 400 if desc invalid', async () => {
	const brandCreationDetails = await createBrand('test', 'test desc');

	await request(app)
		.put(`/api/brands/${brandCreationDetails.body.id}`)
		.send({
			name: 'desc'
		})
		.expect(400);
});
