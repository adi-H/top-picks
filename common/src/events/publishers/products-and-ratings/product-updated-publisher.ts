import { Publisher } from '../../base-publisher';
import { ProductUpdatedEvent } from '../../event-types';
import { Subjects } from '../../subjects';

export class productUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
	subject: Subjects.productUpdated = Subjects.productUpdated;
}
