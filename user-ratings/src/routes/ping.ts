import express, { Request, Response } from 'express';

const router = express.Router();

// this is the api health check lol
router.get('/api/user-ratings/ping', (req: Request, res: Response) => {
	res.send('pong');
});

export { router as pingRouter };
