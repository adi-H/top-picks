import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';

interface ProductUpdatedEvent {
	subject: Subjects.productUpdated;
	data: {
		id: string;
		name: string;
		productType: string;
		avgRating: number;
		brandId: string;
	};
}

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
	subject: Subjects.productUpdated = Subjects.productUpdated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
		console.log('listener product Updated ~~', data.name);

		const { id, name, avgRating } = data;
		const product = await Product.findById(id);
		if (product) {
			await product.set({ id, name, avgRating });
			await product.save();
		}

		msg.ack();
	}
}
