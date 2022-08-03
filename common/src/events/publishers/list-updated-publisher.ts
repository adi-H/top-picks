import { ListDetailsUpdatedEvent } from '../events';
import { Subjects } from '../subjects';
import { Publisher } from './../base-publisher';

export class ListDetailsUpdatedPublisher extends Publisher<ListDetailsUpdatedEvent> {
	subject: Subjects.listDetailsUpdated = Subjects.listDetailsUpdated;
}
