import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface ListDetailsUpdatedEvent {
	subject: Subjects.listDetailsUpdated;
	data: {
		userId: string;
		listId: string;

		name: string;
	};
}

export class ListDetailsUpdatedPublisher extends Publisher<ListDetailsUpdatedEvent> {
	subject: Subjects.listDetailsUpdated = Subjects.listDetailsUpdated;
}
