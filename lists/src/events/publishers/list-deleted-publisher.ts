import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface ListDeletedEvent {
	subject: Subjects.listDeleted;
	data: {
		userId: string;
		listId: string;

		name: string;
	};
}

export class ListDeletedPublisher extends Publisher<ListDeletedEvent> {
	subject: Subjects.listDeleted = Subjects.listDeleted;
}
