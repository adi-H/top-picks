import { Subjects } from '../../subjects';

export interface ProductCreatedEvent {
	subject: Subjects.productCreated;
	data: {
		id: string;
		name: string;
		productType: string;
		avgRating: number;
		brandId: string;
	};
}
