import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import RateLimit from 'express-rate-limit';

// limits to 5 reqs per 1 minute
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 5
});

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			sessionInfo?: UserPayload;
		}
	}
}

const insertUserSession = (req: Request, res: Response, next: NextFunction) => {
	const cookie = req.headers.cookie;
	// console.log(cookie);
	if (!cookie) {
		return next();
	}
	const tokenCookie = cookie.split('; ').find((field) => field.startsWith('jwt'));
	if (!tokenCookie) {
		return next();
	}

	const token = tokenCookie.split('jwt=')[1];
	try {
		// console.log(token);
		const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
		// console.log(payload);
		req.sessionInfo = payload;
	} catch (err) {}
	next();
};

const router = express.Router();

router.get('/api/users/session-info', limiter, insertUserSession, (req, res) => {
	res.send({ sessionInfo: req.sessionInfo || null });
});

export { router as sessionInfoRouter };
