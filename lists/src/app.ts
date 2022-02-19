import RateLimit from 'express-rate-limit';
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
import { deleteListRouter } from './routes/delete-list';
import { indexRouter } from './routes';
import { specificListRouter } from './routes/specific-list';
import { bySpecificUserRouter } from './routes/by-user';
import { updateListDetailsRouter } from './routes/update-details';
import { editListProductsRouter } from './routes/edit-products';

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
	max: 200
});

app.use(limiter);
app.use(insertUserSession);

app.use(pingRouter);
app.use(newListRouter);
app.use(deleteListRouter);
app.use(indexRouter);
app.use(specificListRouter);
app.use(bySpecificUserRouter);
app.use(updateListDetailsRouter);
app.use(editListProductsRouter);

app.all('*', async (req, res) => {
	console.log(req);
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
