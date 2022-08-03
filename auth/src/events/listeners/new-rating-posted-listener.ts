import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Listener, Subjects, NewRatingPostedEvent } from '@adih-toppicks/common';

export class NewRatingPostedListener extends Listener<NewRatingPostedEvent> {
	subject: Subjects.newRatingPosted = Subjects.newRatingPosted;
	queueGroupName: string = queueGroupName;

	async onMessage(data: NewRatingPostedEvent['data'], msg: Message) {
		console.log('listener product created ~~', data.productId);

		// TODO update the user object to contain maybe the ratings?

		msg.ack();
	}
}
