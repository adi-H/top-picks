import { Subjects } from '../subjects';

export interface ProductUpdatedEvent {
	subject: Subjects.productUpdated;
	data: {
		id: string;
		name: string;
		productType: string;
		avgRating: number;
		brandId: string;
	};
}
