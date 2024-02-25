import { Response } from '@google-cloud/functions-framework';
import { IReponseBodyModelProps, ResponseBodyModel } from './response';
import { LoggerAdapter } from '../config/logger/contract';

type TProps = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export class HttpStatusHandler {
	static start(res: Response) {
		const methodNotAllowed = (
			allowedMethod: TProps,
			logger: LoggerAdapter,
		) => {
			logger.error({
				name: 'Método não permitido',
				statusCode: 405,
				message: `Apenas o método ${allowedMethod} é permitido`,
			});

			return ResponseBodyModel.start(res).send({
				name: 'Método não permitido',
				statusCode: 405,
				message: `Apenas o método ${allowedMethod} é permitido`,
			});
		};

		const ok = (body?: IReponseBodyModelProps) => {
			if (body) return ResponseBodyModel.start(res).send(body);
			return res.status(200).end();
		};

		const noContent = () => {
			return res.status(204).end();
		};

		const created = (body?: IReponseBodyModelProps) => {
			if (body) return ResponseBodyModel.start(res).send(body);
			return res.status(201).end();
		};

		const badRequest = (body?: IReponseBodyModelProps) => {
			if (body) return ResponseBodyModel.start(res).send(body);
			return res.status(400).end();
		};

		return { methodNotAllowed, ok, noContent, created, badRequest };
	}
}
