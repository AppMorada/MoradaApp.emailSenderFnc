import { NodejsErrorListener } from './errors/nodejsErrorListener';
NodejsErrorListener.exec();

import { Container } from 'inversify';
import { LoggerAdapter, loggerId } from './config/logger/contract';
import { WinstonLoggerAdapter } from './config/logger/winstonLogger/adapter';
import { SendEmailService, sendEmailServiceId } from './services/sendEmail';
import { HttpStatusHandler } from './utils/httpHandler';
import { Request, Response } from '@google-cloud/functions-framework';
import { FirestoreService, firestoreServiceId } from './storages/firestore';
import { classValidatorParser } from './utils/classValidatorParser';
import { HelloWorldDTO } from './dto/helloWorld';

const container = new Container();

container.bind(firestoreServiceId).to(FirestoreService);
container.bind(sendEmailServiceId).to(SendEmailService);
container.bind(loggerId).to(WinstonLoggerAdapter);

export class SendEmailApp {
	readonly services = {
		sendEmail: container.get<SendEmailService>(sendEmailServiceId),
	};
	readonly deps = {
		logger: container.get<LoggerAdapter>(loggerId),
	};

	private httpStatusPackage: ReturnType<typeof HttpStatusHandler.start>;

	constructor(
		private readonly req: Request,
		private readonly res: Response,
	) {
		this.httpStatusPackage = HttpStatusHandler.start(this.res);
	}

	async exec() {
		const method = 'POST';
		if (this.req.method !== method)
			return this.httpStatusPackage.methodNotAllowed(
				method,
				this.deps.logger,
			);

		const body = await classValidatorParser({
			res: this.res,
			dto: HelloWorldDTO,
			body: this.req.body,
		});

		console.log(body);

		await this.services.sendEmail.exec().then(() => {
			this.httpStatusPackage.ok();
		});
	}
}
