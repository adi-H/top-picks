import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Rating } from '../models/rating';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/user-ratings/user/:userId', async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId);
	if (!user) {
		throw new NotFoundError();
	}
	console.log(user);

	const ratings = await Rating.find();
	console.log(ratings);
	// BANDAID sorta
	// from whatever reason, it insists that r.user is a string when u do typeof, but if u try to check equality (==/===)
	// it decides it's an object, but it also decides it's not equal to the user object
	// using Object.is (despite they're both strings) solves this, for whatever reason
	const ratingsByUser = ratings.filter((r) => Object.is(r.user.toString(), user.id));
	// const ratingsByProduct = await Rating.find({ 'product._id': product.id });
	res.send(ratingsByUser);
});

export { router as byUserRouter };
