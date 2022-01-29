import express, { Request, Response } from 'express';
import { Rating } from '../models/rating';

const router = express.Router();

// this is the api health check lol
router.get('/api/user-ratings', async (req: Request, res: Response) => {
	const allRatings = await Rating.find({});
	res.send(allRatings);
});

export { router as indexRouter };
