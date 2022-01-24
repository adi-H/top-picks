import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface productRatingUpdatedEvent {
	subject: Subjects.productRatingUpdated;
	data: {
		productId: string;
		avgRating: number;
	};
}

export class productRatingUpdatedPublisher extends Publisher<productRatingUpdatedEvent> {
	subject: Subjects.productRatingUpdated = Subjects.productRatingUpdated;
}
