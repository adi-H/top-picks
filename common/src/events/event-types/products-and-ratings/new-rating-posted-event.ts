import { Subjects } from '../../subjects';

export interface NewRatingPostedEvent {
	subject: Subjects.newRatingPosted;
	data: {
		productId: string;
		rating: number;
		userId: string;
	};
}
