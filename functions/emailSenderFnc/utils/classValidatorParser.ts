import { Response } from '@google-cloud/functions-framework';
import { validate } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { HttpError, httpErrorTypes } from '../errors/http';

interface IProps<T extends object> {
	res: Response;
	body: any;
	dto: ClassConstructor<T>;
}

export async function classValidatorParser<T extends object>(data: IProps<T>) {
	const body = plainToClass(data.dto, data.body);
	const errors = await validate(body);

	const errorMessages = errors.flatMap(({ constraints }) =>
		Object.values(constraints!),
	);

	if (errorMessages.length > 0)
		throw new HttpError({
			message: errorMessages,
			status: httpErrorTypes.BAD_REQUEST,
		});

	return body;
}
