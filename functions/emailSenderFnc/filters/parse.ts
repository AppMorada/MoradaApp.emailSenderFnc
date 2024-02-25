import { Response } from '@google-cloud/functions-framework';
import { HttpError } from '../errors/http';
import { HttpErrorParser } from './httpError';
import { LoggerAdapter } from '../config/logger/contract';
import { IReponseBodyModelProps, ResponseBodyModel } from '../utils/response';

export class Filter {
	private readonly resBuilder = ResponseBodyModel.start(this.res);

	private readonly errors = [
		{
			err: HttpError,
			parser: (logger: LoggerAdapter, err: HttpError) =>
				HttpErrorParser.exec(err, logger),
		},
	];

	constructor(
		private readonly res: Response,
		private readonly logger: LoggerAdapter,
	) {}

	exec(err: unknown) {
		let body: IReponseBodyModelProps | undefined;

		this.errors.forEach((item) => {
			if (err instanceof item.err) body = item.parser(this.logger, err);
		});

		if (!body)
			return this.resBuilder.send({
				statusCode: 500,
				name: 'Erro Interno do Servidor',
				message: 'Ooops! Alguma coisa deu errado!',
			});

		return this.resBuilder.send(body);
	}
}
