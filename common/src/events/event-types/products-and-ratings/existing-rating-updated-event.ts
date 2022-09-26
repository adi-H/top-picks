import { Subjects } from '../../subjects';

export interface ExistingRatingUpdatedEvent {
	subject: Subjects.existingRatingUpdated;
	data: {
		ratingId: string;
		productId: string;
		rating: number;
		userId: string;
	};
}
