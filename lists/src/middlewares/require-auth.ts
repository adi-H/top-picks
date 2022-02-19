import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { User } from '../models/user';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
	// console.log(req.sessionInfo);
	if (!req.sessionInfo) {
		throw new NotAuthorizedError();
	}

	const user = await User.findById(req.sessionInfo.id);
	if (!user) {
		throw new NotAuthorizedError();
	}
	next();
};
