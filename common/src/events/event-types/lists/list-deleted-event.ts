import { Subjects } from '../../subjects';

export interface ListDeletedEvent {
	subject: Subjects.listDeleted;
	data: {
		userId: string;
		listId: string;

		name: string;
	};
}
