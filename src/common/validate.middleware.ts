import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { HTTPError } from '../errors/http-error.class';

export class ValidateMiddleware implements IMiddleware {

	constructor(private classToValidate: ClassConstructor<object>) {
	}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		// преобразуем объект в класс переданый в конструктор класса валидатора и валидируем его
		const instance = plainToClass(this.classToValidate, body);

		validate(instance)
			.then(errors => {
				if (errors.length > 0) {
					res.status(422).send(errors);
				} else {
					next();
				}
			})
			.catch(err => {
				next(new HTTPError(500, 'Ошибка валидации', 'validate'));
			});
	}
}
