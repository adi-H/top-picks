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

export const insertUserSession = (req: Request, res: Response, next: NextFunction) => {
	console.log('attempting to insert session', req.session);
	// console.log();
	if (!req.session || !req.session.jwt) {
		return next();
	}

	try {
		// attempt to decode payload thats in req.headers.cookie
		// console.log('attempting to insert payload');
		// const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
		if (req.headers.cookie) {
			console.log('bout to define payload ~~~~~~~~~~~~~');
			const payload = jwt.verify(req.headers.cookie, process.env.JWT_KEY!) as UserPayload;
			req.sessionInfo = payload;
			console.log('made it to console log~~~', req.sessionInfo);
		} else {
			throw Error;
		}
	} catch (err) {
		console.log(err);
	}
	next();
};
