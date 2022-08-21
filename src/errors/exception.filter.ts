import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IEExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

export class ExceptionFilter implements IEExceptionFilter {
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.logger = logger;
	}

	catch(error: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.error(`[${error.context}] Ошибка: ${error.statusCode} ${error.message}`);
			res.status(error.statusCode).send({ err: error.message });
		} else {
			this.logger.error(`Ошибка: ${error.message}`);
			res.status(500).send({ err: error.message });
		}
	}
}
