import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { Brand } from '../../models/brand';
import { Product } from '../../models/product';

interface ProductRatingUpdatedEvent {
	subject: Subjects.productRatingUpdated;
	data: {
		productId: string;
		avgRating: number;
	};
}

export class ProductRatingUpdatedListener extends Listener<ProductRatingUpdatedEvent> {
	subject: Subjects.productRatingUpdated = Subjects.productRatingUpdated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: ProductRatingUpdatedEvent['data'], msg: Message) {
		// console.log('listener caught ~~', data.name);

		const { productId, avgRating } = data;
		const product = await Product.findById(productId);
		if (product) {
			product.set({
				avgRating
			});
			await product.save();
			console.log('updated product avg rating !!!!!!!!!!');
		}

		msg.ack();
	}
}
