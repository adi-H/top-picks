import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface ProductRatingUpdatedEvent {
	subject: Subjects.productRatingUpdated;
	data: {
		productId: string;
		avgRating: number;
	};
}

export class ProductRatingUpdatedPublisher extends Publisher<ProductRatingUpdatedEvent> {
	subject: Subjects.productRatingUpdated = Subjects.productRatingUpdated;
}
