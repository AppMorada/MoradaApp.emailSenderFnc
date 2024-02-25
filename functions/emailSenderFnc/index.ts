import 'reflect-metadata';

import { randomUUID } from 'node:crypto';
import { Request, Response } from '@google-cloud/functions-framework';
import { SendEmailApp } from './app';
import { Filter } from './filters/parse';

export const EmailSenderFnc = async (req: Request, res: Response) => {
	const app = new SendEmailApp(req, res);

	const logger = app.deps.logger;
	const filter = new Filter(res, logger);

	const sessionId = randomUUID();

	logger.info({
		sessionId,
		description: 'Acessando a EmailSenderFnc',
	});

	await app.exec().catch((err) => filter.exec(err));

	logger.info({
		sessionId,
		description: `Retornando com o status code: ${res.statusCode}`,
	});
};
