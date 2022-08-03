import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { List } from '../../models/list';
import { ListDetailsUpdatedEvent, Subjects, Listener } from '@adih-toppicks/common';

export class ListDetailsUpdatedListener extends Listener<ListDetailsUpdatedEvent> {
	subject: Subjects.listDetailsUpdated = Subjects.listDetailsUpdated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: ListDetailsUpdatedEvent['data'], msg: Message) {
		console.log('list updated listener ~~', data.name);

		const list = await List.findById(data.listId);
		if (list) {
			// list.name = data.name
			await list.set({ name: data.name });
			await list.save();
		}

		msg.ack();
	}
}
