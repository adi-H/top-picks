import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	// console.log(req);
	if (!req.sessionInfo) {
		throw new NotAuthorizedError();
	}
	next();
};
