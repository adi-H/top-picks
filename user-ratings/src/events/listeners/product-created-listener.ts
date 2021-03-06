import { Listener, Subjects, ProductCreatedEvent } from '@adih-toppicks/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
	subject: Subjects.productCreated = Subjects.productCreated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
		console.log('listener product created ~~', data.name);

		const { id, name, avgRating } = data;
		const product = Product.build({ id, name, avgRating });
		await product.save();

		console.log(product);
		msg.ack();
	}
}
