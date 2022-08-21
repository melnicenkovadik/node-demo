import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Некорректный email' })
	email: string | undefined;

	@IsString()
	password: string | undefined;
}