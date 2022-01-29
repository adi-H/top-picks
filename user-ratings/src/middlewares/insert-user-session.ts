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
		console.log(payload);
		req.sessionInfo = payload;
	} catch (err) {}
	next();

	// // const c = req.headers.cookie;
	// // console.log(c);
	// // console.log('attempting to insert session', req.headers);

	// console.log(req.session)
	// if (!req.headers.cookie) {
	// 	return next();
	// }

	// try {
	// 	// attempt to decode payload thats in req.headers.cookie
	// 	console.log(req.headers.cookie);
	// 	let cookies = req.headers.cookie.split('; ');
	// 	console.log(cookies);
	// 	// let token = cookies.find(s => s.startsWith('Cookie'))?.split('Cookie=')[1];
	// 	// console.log(token);
	// 	// const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
	// 	// console.log(payload);
	// 	// req.sessionInfo = payload;
	// } catch (err) {
	// 	console.log(err);
	// }
	// next();
};
