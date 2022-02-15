import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from './../errors/request-validation-error';

// if the request parameters are invalid or missing or whatever
// raise error, else continue

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array());
	}
	next();
};
