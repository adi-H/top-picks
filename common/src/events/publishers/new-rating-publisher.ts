import { Publisher } from '../base-publisher';
import { NewRatingPostedEvent } from '../events';
import { Subjects } from '../subjects';

export class NewRatingPostedPublisher extends Publisher<NewRatingPostedEvent> {
	subject: Subjects.newRatingPosted = Subjects.newRatingPosted;
}
