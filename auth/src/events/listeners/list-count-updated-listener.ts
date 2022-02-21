import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { List } from '../../models/list';

export interface ProductCountInListUpdatedEvent {
	subject: Subjects.listProductCountUpdated;
	data: {
		userId: string;
		listId: string;

		count: number;
	};
}

export class ProductCountInListUpdatedListener extends Listener<ProductCountInListUpdatedEvent> {
	subject: Subjects.listProductCountUpdated = Subjects.listProductCountUpdated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: ProductCountInListUpdatedEvent['data'], msg: Message) {
		console.log('list updated listener ~~', data.listId);

		const list = await List.findById(data.listId);
		if (list) {
			await list.set({ count: data.count });
			await list.save();
		}

		msg.ack();
	}
}
