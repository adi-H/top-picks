import { ListDeletedListener } from './events/listeners/list-deleted-listener';
import { ProductCountInListUpdatedListener } from './events/listeners/list-count-updated-listener';
import { ListDetailsUpdatedListener } from './events/listeners/list-updated-listener';
import { NewListCreatedListener } from './events/listeners/list-created-listener';
import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT key must be defined');
		// k create secret generic jwt-secret --from-literal=JWT_KEY=asdf -n adi-dev
	}

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

	if (!process.env.NODE_ENV) {
		throw new Error('NODE_ENV must be defined');
	}

	try {
		await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
		natsWrapper.client.on('close', () => {
			console.log('NATS connection closed!~~');
			process.exit();
		});
		process.on('SIGINT', () => natsWrapper.client.close());
		process.on('SIGTERM', () => natsWrapper.client.close());

		// listeners and stuff here
		new NewListCreatedListener(natsWrapper.client).listen();
		new ListDetailsUpdatedListener(natsWrapper.client).listen();
		new ProductCountInListUpdatedListener(natsWrapper.client).listen();
		new ListDeletedListener(natsWrapper.client).listen();

		await mongoose.connect(process.env.MONGO_URI);
		console.log('auth dep connected to db!~~~~~');
	} catch (err) {
		console.log(err);
	}
};

app.listen(3000, () => {
	console.log('listening on 3000~~~');
});

start();
