import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserCreatedPublisher } from '@adih-toppicks/common';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { natsWrapper } from '../nats-wrapper';
import sanitize from 'mongo-sanitize';

const ADMIN_ACCESS_LABEL = 'admin';
const VIEWER_ACCESS_LABEL = 'viewer';

const userValidationRules = () => {
	return [
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20 characters'),
		body('accessLevel').optional().isString()
	];
};

const router = express.Router();

router.post('/api/users/signup', userValidationRules(), validateRequest, async (req: Request, res: Response) => {
	console.log('attempting to sign in~~~');
	const { email, password, accessLevel } = sanitize(req.body);

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new BadRequestError('email is already in use');
	}

	const userAccess: string =
		accessLevel == ADMIN_ACCESS_LABEL || accessLevel == VIEWER_ACCESS_LABEL ? accessLevel : '~';

	console.log('userAccess "', userAccess, '"');
	const user = User.build({ email: email, password: password, lists: [], userAccess });
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
	res
		.cookie('jwt', userJwt, {
			maxAge: 900000,
			httpOnly: false,
			sameSite: 'lax'
		})
		.status(201)
		.send(user);
});

export { router as signUpRouter };
