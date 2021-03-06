import { Publisher } from '../base-publisher';
import { BrandUpdatedEvent } from '../event-types';
import { Subjects } from '../subjects';

export class BrandUpdatedPublisher extends Publisher<BrandUpdatedEvent> {
	subject: Subjects.brandUpdated = Subjects.brandUpdated;
}
