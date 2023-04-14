import { IEntity } from 'src/modules/shared/entity.interface'

//principio de segregacion de interfaces para dar una manipulación especial (ver principios solid)
interface UserRequired {
	//Definimos los campos requeridos para crear el usuario.
	name: string
	lastname: string
	email: string
	password: string
}

interface UserOptional {
	//campos opcionales para crear el usuario o auto
	active: boolean
	refreshToken: string
	guid: string
}

interface UserUpdate {
	name: string
	lastname: string
	password: string
}

//usaremos un utiliType para pasar las interfaces creadas. Permite englobar tipos para pasar argumentos. (tipos listos para usar)
//https://www.typescriptlang.org/docs/handbook/utility-types.html
// nuestro UserProperties entonces sera la conjunción de los datos ruqueridos y opcionales definidos en las interfaces
export type UserProperties = Required<UserRequired> & Partial<UserOptional>

export default class User implements IEntity<UserProperties, UserUpdate> {
	private name: string
	private lastname: string
	private readonly email: string
	private password: string
	private refreshToken: string
	private active: boolean
	private readonly guid: string

	constructor(userProperties: UserProperties) {
		this.active = true
		Object.assign(this, userProperties)

		/*
		esto seria como hacr
		this.name = this.name
		this.lastname = this.lastname

			if (this.email==....) {
				Estas validaciones no las realiaremos en esta clase, para continuar con buenas practicas-.
			}
		*/
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
		// this, indica que este objeto será modificado en el contexto de esta clase.
		Object.assign(this, fields)
	}
	//Eliminación Logica: softDelete
	delete() {
		this.active = false
	}
}
