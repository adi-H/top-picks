import { Subjects } from '../subjects';

export interface NewListCreatedEvent {
	subject: Subjects.newListCreated;
	data: {
		userId: string;
		listId: string;
		name: string;
	};
}
