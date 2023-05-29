//importar las properties que puede debvolver
import { UserProperties } from 'src/modules/user/domain/user'
import { DTO } from './dto.generic'

//creamos nuestra interfaz personalizada
interface UserOneDTO {
	name: string
	lastname: string
	email: string
	guid: string
}

export type UserListOneDTO = UserOneDTO

//creamos la clase que implementa la interfaz heredada del singleton
export class UserListOneMapping extends DTO<UserProperties, UserListOneDTO> {
	execute(data: UserProperties): UserListOneDTO {
		return {
			name: data.name,
			lastname: data.lastname,
			email: data.email.value,
			guid: data.guid,
		}
	}
}
