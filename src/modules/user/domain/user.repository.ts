//el reposiorio es una capa de comunicacion entre aplicación e infraestructura

import User, { UserProperties } from './user'

// inversion de dependencias.
export interface UserRepository {
	list(): Promise<User[]>
	listOne(guid: string): Promise<User>
	insert(user: User): Promise<User>
	update(user: User): Promise<User>
	delete(guid: string): Promise<User>
	//aplication
}
