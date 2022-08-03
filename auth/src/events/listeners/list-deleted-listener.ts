import { queueGroupName } from './queue-group-name';
import { Subjects, ListDeletedEvent, Listener } from '@adih-toppicks/common';
import { Message } from 'node-nats-streaming';
import { List } from '../../models/list';
import { User } from '../../models/user';

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
