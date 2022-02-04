import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import cors from 'cors';

import { pingRouter } from './routes/ping';
import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { logoutRouter } from './routes/logout';
import { sessionInfoRouter } from './routes/session-info';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		secure: false,
		signed: false
		// secure: process.env.NODE_ENV !== 'test'
	})
);
// DOCUMENTATION https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
app.use(
	cors({
		origin: '*'
	})
);

app.use(pingRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(logoutRouter);
app.use(sessionInfoRouter);

app.all('*', async (req, res) => {
	// console.log(req);
	console.log('REQ PATH NOT FOUND');
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
