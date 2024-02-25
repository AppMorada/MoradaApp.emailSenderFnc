interface IHttpErrorData {
	type: string;
	code: number;
}

export const httpErrorTypes = {
	BAD_REQUEST: {
		type: 'Bad Request',
		code: 400,
	},
	UNAUTHORIZED: {
		type: 'Unauthorized',
		code: 401,
	},
	INTERNAL_SERVER_ERROR: {
		type: 'Internal Server Error',
		code: 500,
	},
	TOO_MANY_REQUEST: {
		type: 'Too Many Request',
		code: 429,
	},
	METHOD_NOT_ALLOWED: {
		type: 'Method Not Allowed',
		code: 405,
	},
};

interface IProps {
	status: IHttpErrorData;
	message: string | string[];
}

export class HttpError {
	readonly message: string | string[];
	readonly statusContent: IHttpErrorData;
	readonly name: string;

	constructor(input: IProps) {
		this.name = 'HTTP ERROR';
		this.message = input.message;
		this.statusContent = input.status;
	}
}
