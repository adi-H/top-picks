import { Publisher } from '../../base-publisher';
import { ExistingRatingUpdatedEvent } from '../../event-types';
import { Subjects } from '../../subjects';

export class ExistingRatingUpdatedPublisher extends Publisher<ExistingRatingUpdatedEvent> {
	subject: Subjects.existingRatingUpdated = Subjects.existingRatingUpdated;
}
