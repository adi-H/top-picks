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
		signed: false,
		secure: false
		// secure: process.env.NODE_ENV !== 'test'
	})
);
// DOCUMENTATION https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
app.use(
	cors({
		origin: '*',
		credentials: true,
		exposedHeaders: [ 'Set-Cookie' ]
	})
);

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', '*');

	// Pass to next layer of middleware
	next();
});

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
