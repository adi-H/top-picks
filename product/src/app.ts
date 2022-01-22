import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { pingRouter } from './routes/ping';
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
// app.use(signUpRouter);
// app.use(signInRouter);
// app.use(logoutRouter);
// app.use(sessionInfoRouter);

app.all('*', async (req, res) => {
	console.log(req);
	// throw new NotFoundError();
});

// app.use(errorHandler);

export { app };
