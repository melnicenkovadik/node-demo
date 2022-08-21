import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string | undefined;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string | undefined {
		return this._email;
	}

	get name(): string | undefined {
		return this._name;
	}

	get password(): string | undefined {
		return this._password;
	}

	public async setPassword(password: string | undefined, salt: number): Promise<void> {
		if (password != null) {
			this._password = await hash(password, salt);
		}
	}

	public async comparePassword(password: string): Promise<boolean> {
		if (this._password != null) {
			return await compare(password, this._password);
		}
		return false;
	}
}
