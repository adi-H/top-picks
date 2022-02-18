import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface NewListCreatedEvent {
	subject: Subjects.newListCreated;
	data: {
		productId: string;
		avgRating: number;
	};
}

export class NewListCreatedPublisher extends Publisher<NewListCreatedEvent> {
	subject: Subjects.newListCreated = Subjects.newListCreated;
}
