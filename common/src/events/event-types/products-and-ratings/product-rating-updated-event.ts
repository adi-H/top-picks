import { Subjects } from '../../subjects';

export interface ProductRatingUpdatedEvent {
	subject: Subjects.productRatingUpdated;
	data: {
		productId: string;
		avgRating: number;
	};
}
