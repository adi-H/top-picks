import { Subjects } from '../subjects';
import { Publisher } from './../base-publisher';
import { UserCreatedEvent } from '../events/index';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
	subject: Subjects.userCreated = Subjects.userCreated;
}
