import { Subjects } from '../subjects';
import { Publisher } from './../base-publisher';
import { ProductCountInListUpdatedEvent } from './../events';

export class ProductCountInListUpdatedPublisher extends Publisher<ProductCountInListUpdatedEvent> {
	subject: Subjects.listProductCountUpdated = Subjects.listProductCountUpdated;
}
