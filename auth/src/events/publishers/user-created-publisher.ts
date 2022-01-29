import { Subjects } from '../subjects';
import { Publisher } from './base-publisher';

interface UserCreatedEvent {
	subject: Subjects.userCreated;
	data: {
		id: string;
		email: string;
	};
}

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
	subject: Subjects.userCreated = Subjects.userCreated;
}
