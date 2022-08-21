import { NextFunction, Request, Response } from 'express';

export interface IEExceptionFilter {
	catch(error: any, req: Request, res: Response, next: NextFunction): void;
}
