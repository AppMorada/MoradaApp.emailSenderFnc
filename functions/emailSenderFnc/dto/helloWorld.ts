import { IsString } from 'class-validator';

export class HelloWorldDTO {
	@IsString({
		message: 'O campo "msg" precisa ser uma string',
	})
		msg: string;
}
