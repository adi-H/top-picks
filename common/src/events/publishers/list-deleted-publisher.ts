import { ListDeletedEvent } from '../events';
import { Subjects } from '../subjects';
import { Publisher } from './../base-publisher';

export class ListDeletedPublisher extends Publisher<ListDeletedEvent> {
	subject: Subjects.listDeleted = Subjects.listDeleted;
}
