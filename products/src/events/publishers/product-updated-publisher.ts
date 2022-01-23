import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface ProductUpdatedEvent {
	subject: Subjects.productUpdated;
	data: {
		id: string;
		name: string;
		productType: string;
		avgRating: number;
		brandId: string;
	};
}

export class productUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
	subject: Subjects.productUpdated = Subjects.productUpdated;
}
