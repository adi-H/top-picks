import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', async (req: Request, res: Response) => {
	console.log('attempting to sign in~~~');
	const { email, password } = req.body;

	console.log(email);
	res.status(201).send({});
});

export { router as signUpRouter };
