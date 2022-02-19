import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { natsWrapper } from '../nats-wrapper';
import sanitize from 'mongo-sanitize';

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
	const cleanEmail = sanitize(email);
	const cleanPassword = sanitize(password);

	const existingUser = await User.findOne({ cleanEmail });
	if (existingUser) {
		throw new BadRequestError('email is already in use');
	}

	const user = User.build({ email: cleanEmail, password: cleanPassword });
	await user.save();

	// prompt event here
	new UserCreatedPublisher(natsWrapper.client).publish({
		id: user.id,
		email: user.email
	});

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
	// req.session.save();

	console.log('user was created ~~', email);

	// TODO i dunno anymore
	// res.status(201).send(user);
	res.cookie('jwt', userJwt, {
		maxAge: 900000,
		httpOnly: false,
		sameSite: 'lax'
	});

	res.status(201).send(user);
});

export { router as signUpRouter };
