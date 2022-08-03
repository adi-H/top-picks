import { Subjects } from '../subjects';

export interface UserCreatedEvent {
	subject: Subjects.userCreated;
	data: {
		id: string;
		email: string;
	};
}
