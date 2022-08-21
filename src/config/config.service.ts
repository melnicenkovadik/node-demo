import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput | undefined;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
	) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService]: Не удалось загрузить конфигурацию из .env или он отсутствует');
		}
		this.logger.log('[ConfigService]: Конфигурация .env загружена');
		this.config = result.parsed as DotenvParseOutput;

	}

	get<T extends string | number>(key: string): T | undefined {
		return this.config?.[key] as T;
	}
}