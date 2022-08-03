import { Publisher } from '../base-publisher';
import { NewListCreatedEvent } from '../events';
import { Subjects } from '../subjects';

export class NewListCreatedPublisher extends Publisher<NewListCreatedEvent> {
	subject: Subjects.newListCreated = Subjects.newListCreated;
}
