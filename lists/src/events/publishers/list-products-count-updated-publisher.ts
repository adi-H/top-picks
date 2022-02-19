import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface ProductCountInListUpdatedEvent {
	subject: Subjects.listProductCountUpdated;
	data: {
		userId: string;
		listId: string;

		count: number;
	};
}

export class ProductCountInListUpdatedPublisher extends Publisher<ProductCountInListUpdatedEvent> {
	subject: Subjects.listProductCountUpdated = Subjects.listProductCountUpdated;
}
