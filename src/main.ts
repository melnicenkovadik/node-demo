import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { UserService } from './users/user.service';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserController } from './users/users.controller.interface';
import { IUserService } from './users/user.service.interface';
import { TYPES } from './types';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService);
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrapReturn {
	app: App;
	container: Container;
}

function bootstrap(): IBootstrapReturn {
	const container = new Container();
	container.load(appBindings);
	const app = container.get<App>(TYPES.Application);
	app.init();
	return { app, container };
}

export const { app, container } = bootstrap();
