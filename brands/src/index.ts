import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
	// if (!process.env.JWT_KEY) {
	// 	throw new Error('JWT key must be defined');
	// 	// k create secret generic jwt-secret --from-literal=JWT_KEY=asdf -n adi-dev
	// }

	if (!process.env.MONGO_URI) {
		throw new Error('process.env.MONGO_URI must be defined');
		// k create secret generic jwt-secret --from-literal=JWT_KEY=asdf -n adi-dev
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('product dep connected to db!~~~~~');
	} catch (err) {
		console.log(err);
	}
};

app.listen(3000, () => {
	console.log('listening on 3000~~~');
});

start();
