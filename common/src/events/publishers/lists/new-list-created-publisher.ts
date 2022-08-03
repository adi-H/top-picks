import { Subjects } from '../../subjects';
import { Publisher } from '../../base-publisher';
import { NewListCreatedEvent } from '../../event-types';

export class NewListCreatedPublisher extends Publisher<NewListCreatedEvent> {
	subject: Subjects.newListCreated = Subjects.newListCreated;
}
