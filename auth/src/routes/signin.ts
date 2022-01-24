import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

const reqValidationRules = () => {
	return [
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20 characters')
	];
};

router.post('/api/users/signin', reqValidationRules(), validateRequest, async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// check if user exists and if the passwords match
	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		throw new BadRequestError('invalid user -- doesnt exist');
	}
	const doPasswordsMatch = await Password.compare(existingUser.password, password);
	if (!doPasswordsMatch) {
		throw new BadRequestError('invalid user -- wrong creds');
	}

	const userJwt = jwt.sign(
		{
			id: existingUser.id,
			email: existingUser.email
		},
		process.env.JWT_KEY!
		// JWT_KEY was already verified to exist in the app file
		// so u can assume happily it exists
		// the ! is to make ts stop being angry bout it
	);
	if (!req.session) {
		req.session = {};
	}
	req.session.jwt = userJwt;
	req.session.save();
	console.log(req.session.jwt);

	// why does adding res.cookie work but not the req.session ????
	res.status(200).send(existingUser);
	// res.status(200).cookie('jwt', userJwt).send(existingUser);
});

export { router as signInRouter };
