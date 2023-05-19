import User from '../domain/user'
import { UserRepository } from "../domain/user.repository";


export default class UserApplication {
    //Principio solid: Inversión de depenecias. dependemos del repositorio
    //Patrón de diseño: injection dependeny, que permite aplicar el principio solid anteior

    constructor(private readonly userRepository:UserRepository){}

    insert(user:User) {
        return this.userRepository.insert(user)

    }

    list(){
        return this.userRepository.list()
    }

    listOne(guid:string){
        return this.userRepository.listOne(guid)
    }

    update (guid:string, user:User) {
        return this.userRepository.update(guid,user)
    }


    


}

