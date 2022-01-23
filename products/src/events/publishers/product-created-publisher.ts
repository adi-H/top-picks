import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface ProductCreatedEvent {
	subject: Subjects.productCreated;
	data: {
		id: string;
		name: string;
		productType: string;
		avgRating: number;
		brandId: string;
	};
}

export class productCreatedPublisher extends Publisher<ProductCreatedEvent> {
	subject: Subjects.productCreated = Subjects.productCreated;
}
