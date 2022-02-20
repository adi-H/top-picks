import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { errorHandler } from './middlewares/error-handler';
import { insertUserSession } from './middlewares/insert-user-session';
import RateLimit from 'express-rate-limit';

import { pingRouter } from './routes/ping';
import { newRatingRouter } from './routes/new-rating';
import { indexRouter } from './routes/index';
import { NotFoundError } from './errors/not-found-error';
import { byProductRouter } from './routes/by-product-id';
import { byUserRouter } from './routes/by-user-id';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);

// limits to 20 reqs per 1 minute
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 20
});

app.use(limiter);
app.use(insertUserSession);

app.use(pingRouter);
app.use(newRatingRouter);
app.use(indexRouter);
app.use(byProductRouter);
app.use(byUserRouter);

app.all('*', async (req, res) => {
	console.log(req);
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
