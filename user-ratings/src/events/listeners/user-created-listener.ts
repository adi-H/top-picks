import { Listener, Subjects, UserCreatedEvent } from '@adih-toppicks/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { User } from '../../models/user';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
	subject: Subjects.userCreated = Subjects.userCreated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: UserCreatedEvent['data'], msg: Message) {
		console.log('listener User created ~~', data.email, '~~~~~', data.id);

		const { id, email } = data;
		const user = User.build({ _id: id, email });
		await user.save();

		console.log('added the user to db ~~', user);

		msg.ack();
	}
}
