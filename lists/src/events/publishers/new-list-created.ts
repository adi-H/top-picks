import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface NewListCreatedEvent {
	subject: Subjects.newListCreated;
	data: {
		userId: string;
		listId: string;

		name: string;
	};
}

export class NewListCreatedPublisher extends Publisher<NewListCreatedEvent> {
	subject: Subjects.newListCreated = Subjects.newListCreated;
}
