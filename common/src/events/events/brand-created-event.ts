import { Subjects } from '../subjects';

export interface BrandCreatedEvent {
	subject: Subjects.brandCreated;
	data: {
		id: string;
		name: string;
		description: string;
	};
}
