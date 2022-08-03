import { Publisher } from '../../base-publisher';
import { ProductCreatedEvent } from '../../event-types';
import { Subjects } from '../../subjects';

export class productCreatedPublisher extends Publisher<ProductCreatedEvent> {
	subject: Subjects.productCreated = Subjects.productCreated;
}
