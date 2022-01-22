import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface BrandCreatedEvent {
	subject: Subjects.brandCreated;
	data: {
		id: string;
		name: string;
		description: string;
	};
}

export class BrandCreatedPublisher extends Publisher<BrandCreatedEvent> {
	subject: Subjects.brandCreated = Subjects.brandCreated;
}
