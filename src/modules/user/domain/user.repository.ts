//el reposiorio es una capa de comunicacion entre aplicación e infraestructura

import User, { UserProperties } from './user'

// inversion de dependencias.
export interface UserRepository {
	list(): UserProperties[]
	lsitOne(guid: string): User
	insert(user: User): User
	update(user: User): User
	delelete(guid: string): User

	//aplication
}
