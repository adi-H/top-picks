import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
	if (!req.session || !req.session.jwt) {
		// !req.session?.jwt is equal to !req.session || !req.session.jwt
		// formatter just didnt like it
		return next();
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
		req.sessionInfo = payload;
	} catch (err) {}
	next();
};

const router = express.Router();

router.get('/api/users/session-info', insertUserSession, (req, res) => {
	res.send({ sessionInfo: req.sessionInfo || null });
});

export { router as sessionInfoRouter };
