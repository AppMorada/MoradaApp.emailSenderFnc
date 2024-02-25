import { injectable } from 'inversify';

export const sendEmailServiceId = Symbol.for('__send_email_service_id__');

@injectable()
export class SendEmailService {
	constructor() {}

	async exec() {}
}
