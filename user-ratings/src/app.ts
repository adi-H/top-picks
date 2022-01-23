import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { errorHandler } from './middlewares/error-handler';

import { pingRouter } from './routes/ping';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);

app.use(pingRouter);
// app.use(newProductRouter);
// app.use(indexRouter);
// app.use(specificProductRouter);
// app.use(updateProductRouter);

app.all('*', async (req, res) => {
	console.log(req);
	// throw new NotFoundError();
});

app.use(errorHandler);

export { app };
