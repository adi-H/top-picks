import { CustomError } from './custom-error';

export class NotAuthorizedForActionError extends CustomError {
	statusCode = 401;

	constructor() {
		super('not authorized for this action');

		Object.setPrototypeOf(this, NotAuthorizedForActionError.prototype);
	}

	serializeErrors() {
		return [ { message: 'not authorized for this action' } ];
	}
}
