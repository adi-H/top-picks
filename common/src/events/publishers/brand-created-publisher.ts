import { Publisher } from '../base-publisher';
import { BrandCreatedEvent } from '../event-types';
import { Subjects } from '../subjects';

export class BrandCreatedPublisher extends Publisher<BrandCreatedEvent> {
	subject: Subjects.brandCreated = Subjects.brandCreated;
}
