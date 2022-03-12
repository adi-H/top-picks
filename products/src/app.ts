import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import 'express-async-errors';

import { pingRouter } from './routes/ping';
import { newProductRouter } from './routes/new-product';
import { indexRouter } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { getProductPicRouter } from './routes/get-product-pic';
import { specificProductRouter } from './routes/specific-product';
import { updateProductRouter } from './routes/update';
import { byBrandIdRouter } from './routes/by-brand-id';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);
app.use(
	cors({
		origin: '*',
		credentials: true
	})
);

app.use(pingRouter);
app.use(newProductRouter);
app.use(indexRouter);
app.use(byBrandIdRouter);
app.use(specificProductRouter);
app.use(updateProductRouter);
app.use(getProductPicRouter);

app.all('*', async (req, res) => {
	console.log(req);
	// throw new NotFoundError();
});

app.use(errorHandler);

export { app };
