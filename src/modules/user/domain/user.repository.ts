//el reposiorio es una capa de comunicacion entre aplicación e infraestructura
import { Result } from 'neverthrow'
import User, { UserUpdate } from './user'

import { UserNotFoundException } from './exceptions/user.exception'

// inversion de dependencias.
export interface UserRepository {
	list(): Promise<User[]>
	listOne(guid: string): Promise<Result<User, UserNotFoundException>> //ejemplo para retornar un resultado con sus codigos de exepcion usando neverthrow.+
	update(guid: string, user: Partial<UserUpdate>): Promise<Result<User, UserNotFoundException>> //partial es un utilitario que permite pasar estructura de datos y utilizar en forma parcial
	delete(guid: string): Promise<Result<User,UserNotFoundException>>
	//aplication
}
