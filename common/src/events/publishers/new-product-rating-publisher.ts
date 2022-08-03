import { Publisher } from '../base-publisher';
import { ProductRatingUpdatedEvent } from '../events';
import { Subjects } from '../subjects';

export class ProductRatingUpdatedPublisher extends Publisher<ProductRatingUpdatedEvent> {
	subject: Subjects.productRatingUpdated = Subjects.productRatingUpdated;
}
