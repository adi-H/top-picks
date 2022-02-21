import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { List } from '../../models/list';

export interface ListDetailsUpdatedEvent {
	subject: Subjects.listDetailsUpdated;
	data: {
		userId: string;
		listId: string;

		name: string;
	};
}

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
