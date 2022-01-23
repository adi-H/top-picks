import request from 'supertest';
import { app } from '../../app';

// this is the health check test
// cause why not lol
it('responds pong', async () => {
	const res = await request(app).get('/api/user-ratings/ping').send().expect(200);

	expect(res.text).toEqual('pong');
});
