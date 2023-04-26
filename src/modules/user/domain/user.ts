import { IEntity } from '../../shared/entity.interface'

interface UserRequired {
	//Definimos los campos requeridos para crear el usuario.
	name: string
	lastname: string
	email: string
	password: string
}

interface userOptional {
	//campos opcionales para crear el usuario o automaticamente
	active: boolean
	refreshToken: string
	guid: string
}

interface UserUpdate {
	name: string
	lastname: string
	password: string
}

//https://www.typescriptlang.org/docs/handbook/utility-types.html
export type UserProperties = Required<UserRequired> & Partial<userOptional>

export default class User implements IEntity<UserProperties, UserUpdate> {
	private name: string
	private lastname: string
	private readonly email: string
	private password: string
	private active: boolean
	private readonly guid: string //buena practica en seguridad
	private refreshToken: string

	constructor(usertProperties: UserProperties) {
		this.active = true
		Object.assign(this, usertProperties)
	}

	properties(): UserProperties {
		return {
			name: this.name,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			refreshToken: this.refreshToken,
			active: this.active,
			guid: this.guid,
		}
	}

	update(fields: UserUpdate) {
		Object.assign(this, fields)
	}

	delete() {
		this.active = false
	}
}
