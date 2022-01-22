import request from 'supertest';
import { app } from '../../app';

it('returns a 201 with valid brand', (done) => {
	request(app)
		.post('/api/brands')
		.send({
			name: 'test',
			description: 'adkjhsad asdihsa dlk'
		})
		.expect(201);
	done();
});

it('returns 400 with missing brand name', (done) => {
	request(app)
		.post('/api/brands')
		.send({
			description: 'adkjhsad asdihsa dlk'
		})
		.expect(400);
	done();
});

it('returns 400 with invalid brand description', (done) => {
	request(app)
		.post('/api/brands')
		.send({
			name: 'test'
		})
		.expect(400);
	done();
});

it('returns 400 with brand that already exists', (done) => {
	request(app)
		.post('/api/brands')
		.send({
			name: 'test',
			description: 'adkjhsad asdihsa dlk'
		})
		.expect(201);

	request(app)
		.post('/api/brands')
		.send({
			name: 'test',
			description: 'adkjhsad asdihsa dlk'
		})
		.expect(400);
	done();
});
