import { Publisher } from '../base-publisher';
import { ProductCreatedEvent } from '../events';
import { Subjects } from '../subjects';

export class productCreatedPublisher extends Publisher<ProductCreatedEvent> {
	subject: Subjects.productCreated = Subjects.productCreated;
}
