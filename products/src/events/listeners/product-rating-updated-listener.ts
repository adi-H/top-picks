import { queueGroupName } from './queue-group-name';
import { Listener, Subjects, ProductRatingUpdatedEvent } from '@adih-toppicks/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';

export class ProductRatingUpdatedListener extends Listener<ProductRatingUpdatedEvent> {
	subject: Subjects.productRatingUpdated = Subjects.productRatingUpdated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: ProductRatingUpdatedEvent['data'], msg: Message) {
		// console.log('listener caught ~~', data.name);

		const { productId, avgRating } = data;
		const product = await Product.findById(productId);
		if (product) {
			const numberOfRatings = product.numberOfRatings;
			product.set({
				avgRating,
				numberOfRatings: numberOfRatings + 1
			});
			await product.save();
			console.log('updated product avg rating !!!!!!!!!!');
		}

		msg.ack();
	}
}
