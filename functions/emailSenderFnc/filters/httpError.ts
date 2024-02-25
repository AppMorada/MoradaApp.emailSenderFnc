import { LoggerAdapter } from '../config/logger/contract';
import { HttpError } from '../errors/http';
import { IReponseBodyModelProps } from '../utils/response';

export class HttpErrorParser {
	static exec(err: HttpError, logger: LoggerAdapter) {
		logger.error({
			name: `${err.name} - ${err.statusContent.type}`,
			message: err.message,
			statusCode: err.statusContent.code,
		});

		return {
			name: err.statusContent.type,
			message:
				err.statusContent.code !== 401 ? err.message : 'Unauthorized',
			statusCode: err.statusContent.code,
		} as IReponseBodyModelProps;
	}
}
