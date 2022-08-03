import { Subjects } from '../../subjects';

export interface ListDetailsUpdatedEvent {
	subject: Subjects.listDetailsUpdated;
	data: {
		userId: string;
		listId: string;

		name: string;
	};
}
