import express from 'express';
import { json } from 'body-parser';
// import cookieSession from 'cookie-session';
// import 'express-async-errors';

import { pingRouter } from './routes/ping';
import { signUpRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(pingRouter);
app.use(signUpRouter);

app.all('*', async (req, res) => {
	console.log(req);
	// throw new NotFoundError();
});

// app.use(errorHandler);

export { app };
