import { Publisher } from '../base-publisher';
import { ProductUpdatedEvent } from '../events';
import { Subjects } from '../subjects';

export class productUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
	subject: Subjects.productUpdated = Subjects.productUpdated;
}
