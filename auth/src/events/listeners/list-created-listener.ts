import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { User } from '../../models/user';
import { List } from '../../models/list';
import { NewListCreatedEvent, Listener, Subjects } from '@adih-toppicks/common';

export class NewListCreatedListener extends Listener<NewListCreatedEvent> {
	subject: Subjects.newListCreated = Subjects.newListCreated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: NewListCreatedEvent['data'], msg: Message) {
		console.log('list created listener ~~', data.name);

		const user = await User.findById(data.userId);
		if (user) {
			const list = await List.build({
				_id: data.listId,
				name: data.name,
				count: 0
			});
			await list.save();

			const userLists = user.lists;
			userLists.push(list);
			await user.set({ lists: userLists });
			await user.save();
		}

		msg.ack();
	}
}
