import { BadRequestError } from './bad-request-error';

export class RatingExistsError extends BadRequestError {
	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, RatingExistsError.prototype);
	}

	serializeErrors() {
		return [ { message: this.message } ];
	}
}
