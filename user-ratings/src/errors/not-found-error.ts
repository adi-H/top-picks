// import { CustomError } from './custom-error';
import { CustomError } from '@adih-toppicks/common';

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor() {
		super('route not found');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors() {
		return [ { message: 'not found ' } ];
	}
}
