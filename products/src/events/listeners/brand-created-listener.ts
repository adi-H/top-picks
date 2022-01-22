import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { Brand } from '../../models/brand';

interface BrandCreatedEvent {
	subject: Subjects.brandCreated;
	data: {
		id: string;
		name: string;
		description: string;
	};
}

export class BrandCreatedListener extends Listener<BrandCreatedEvent> {
	subject: Subjects.brandCreated = Subjects.brandCreated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: BrandCreatedEvent['data'], msg: Message) {
		console.log('listener created ~~', data.name);

		const { id, name } = data;
		const brand = Brand.build({ id, name });
		await brand.save();

		msg.ack();
	}
}
