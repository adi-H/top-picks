import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
	// if (!process.env.JWT_KEY) {
	// 	throw new Error('JWT key must be defined');
	// 	// k create secret generic jwt-secret --from-literal=JWT_KEY=asdf -n adi-dev
	// }

	if (!process.env.MONGO_URI) {
		throw new Error('process.env.MONGO_URI must be defined');
		// k create secret generic jwt-secret --from-literal=JWT_KEY=asdf -n adi-dev
	}

	if (!process.env.NATS_URL) {
		throw new Error('NATS_URL must be defined');
	}

	if (!process.env.NATS_CLIENT_ID) {
		throw new Error('NATS_CLIENT_ID must be defined');
	}

	if (!process.env.NATS_CLUSTER_ID) {
		throw new Error('NATS_CLUSTER_ID must be defined');
	}

	try {
		await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
		natsWrapper.client.on('close', () => {
			console.log('NATS connection closed!~~');
			process.exit();
		});
		process.on('SIGINT', () => natsWrapper.client.close());
		process.on('SIGTERM', () => natsWrapper.client.close());

		// all like listeners go here

		await mongoose.connect(process.env.MONGO_URI);
		console.log('lists dep connected to db!~~~~~');
	} catch (err) {
		console.log(err);
	}
};

app.listen(3000, () => {
	console.log('listening on 3000~~~');
});

start();
