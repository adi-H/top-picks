import { queueGroupName } from './queue-group-name';
import { Subjects } from '../subjects';
import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { Brand } from '../../models/brand';

interface BrandUpdatedEvent {
	subject: Subjects.brandUpdated;
	data: {
		id: string;
		name: string;
		description: string;
	};
}

export class BrandUpdatedListener extends Listener<BrandUpdatedEvent> {
	subject: Subjects.brandUpdated = Subjects.brandUpdated;
	queueGroupName: string = queueGroupName;

	async onMessage(data: BrandUpdatedEvent['data'], msg: Message) {
		// TODO add logic of creating brand and saving to db and all that here
		console.log('listener updated ~~', data.name);
		const { id, name } = data;
		const brand = await Brand.findById(id);
		if (brand) {
			await brand.set({ id, name });
			await brand.save();
		}

		msg.ack();
	}
}
