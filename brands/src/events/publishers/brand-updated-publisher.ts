import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface BrandUpdatedEvent {
	subject: Subjects.brandUpdated;
	data: {
		id: string;
		name: string;
		description: string;
	};
}

export class BrandUpdatedPublisher extends Publisher<BrandUpdatedEvent> {
	subject: Subjects.brandUpdated = Subjects.brandUpdated;
}
