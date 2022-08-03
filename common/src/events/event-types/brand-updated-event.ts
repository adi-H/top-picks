import { Subjects } from '../subjects';

export interface BrandUpdatedEvent {
	subject: Subjects.brandUpdated;
	data: {
		id: string;
		name: string;
		description: string;
	};
}
