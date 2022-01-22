import request from 'supertest';
import { app } from '../../app';

// this is the health check test
// cause why not lol
it('responds pong', async () => {
	const res = await request(app).get('/api/products/ping').send().expect(200);
	// console.log(res.text);

	expect(res.text).toEqual('pong');
});
