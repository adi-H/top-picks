import { Subjects } from '../subjects';

export interface ProductCountInListUpdatedEvent {
	subject: Subjects.listProductCountUpdated;
	data: {
		userId: string;
		listId: string;

		count: number;
	};
}
