import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { insertUserSession } from './middlewares/insert-user-session';
// import cookieSession from 'cookie-session';
// import 'express-async-errors';

import { pingRouter } from './routes/ping';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { newListRouter } from './routes/new-list';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);
app.use(insertUserSession);

app.use(pingRouter);
app.use(newListRouter);

app.all('*', async (req, res) => {
	console.log(req);
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
