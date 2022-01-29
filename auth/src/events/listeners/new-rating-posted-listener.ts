import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';

interface NewRatingPostedEvent {
	subject: Subjects.newRatingPosted;
	data: {
		productId: string;
		rating: number;
		userId: string;
	};
}

export class NewRatingPostedListener extends Listener<NewRatingPostedEvent> {
	subject: Subjects.newRatingPosted = Subjects.newRatingPosted;
	queueGroupName: string = queueGroupName;

	async onMessage(data: NewRatingPostedEvent['data'], msg: Message) {
		console.log('listener product created ~~', data.productId);

		// TODO update the user object to contain maybe the ratings?

		msg.ack();
	}
}
