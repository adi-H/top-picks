import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';

const userValidationRules = () => {
	return [
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20 characters')
	];
};

const router = express.Router();

router.post('/api/users/signup', userValidationRules(), validateRequest, async (req: Request, res: Response) => {
	console.log('attempting to sign in~~~');
	const { email, password } = req.body;

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new BadRequestError('email is already in use');
	}

	const user = User.build({ email, password });
	await user.save();

	// generate JWT for the session and store it in the session obj
	const userJwt = jwt.sign(
		{
			id: user.id,
			email: user.email
		},
		process.env.JWT_KEY!
	);
	req.session = {
		jwt: userJwt
	};

	console.log('user was created ~~', email);
	res.status(201).send(user);
});

export { router as signUpRouter };
