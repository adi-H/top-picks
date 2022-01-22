import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { pingRouter } from './routes/ping';
import { indexBrandsRouter } from './routes/index';
import { newBrandRouter } from './routes/new-brand';
import { specificBrandRouter } from './routes/brand-details';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
// import { signUpRouter } from './routes/signup';
// import { signInRouter } from './routes/signin';
// import { logoutRouter } from './routes/logout';
// import { sessionInfoRouter } from './routes/session-info';

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
app.use(indexBrandsRouter);
app.use(newBrandRouter);
app.use(specificBrandRouter);

app.all('*', async (req, res) => {
	console.log(req);
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
