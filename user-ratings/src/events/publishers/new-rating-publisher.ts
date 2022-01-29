import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface NewRatingPostedEvent {
	subject: Subjects.newRatingPosted;
	data: {
		productId: string;
		rating: number;
		userId: string;
	};
}

export class NewRatingPostedPublisher extends Publisher<NewRatingPostedEvent> {
	subject: Subjects.newRatingPosted = Subjects.newRatingPosted;
}
