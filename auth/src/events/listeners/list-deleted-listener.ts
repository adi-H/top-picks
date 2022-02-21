import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { List } from '../../models/list';
import { User } from '../../models/user';

export interface ListDeletedEvent {
	subject: Subjects.listDeleted;
	data: {
		userId: string;
		listId: string;

		name: string;
	};
}

export class ListDeletedListener extends Listener<ListDeletedEvent> {
	subject: Subjects.listDeleted = Subjects.listDeleted;
	queueGroupName: string = queueGroupName;

	async onMessage(data: ListDeletedEvent['data'], msg: Message) {
		console.log('list deleted listener ~~', data.listId);

		const user = await User.findById(data.userId);
		if (user) {
			await List.findByIdAndDelete(data.listId);

			const userLists = user.lists;
			userLists.splice(userLists.findIndex((l) => l.id === data.listId), 1);
			await user.set({ lists: userLists });
			await user.save();
		}

		msg.ack();
	}
}
