import { v4 as uuidv4 } from 'uuid'
import User, { UserProperties } from './user'
import { UserPasswordService } from './services/user-password.service'
//https://refactoring.guru/design-patterns/abstract-factory
export default class UserFactory {
	//al tratarse de un patron de diseño recreacional,  representará las definiones que deberan tener
	//las propiedades del objeto al momento de crearlo
	async create(name: string, lastname: string, email: string, password: string) {
		const passwordHash = await UserPasswordService.hash(password)

		const userProperties: UserProperties = {
			name,
			lastname,
			email,
			password: passwordHash,
			guid: uuidv4(), //generar
			refreshToken: uuidv4(), //generar
		}
		const user = new User(userProperties)
		return user
	}
}
