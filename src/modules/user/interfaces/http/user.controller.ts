import { Request, Response, NextFunction } from "express";
import UserApplication  from "../../application/user.application"
import { UserInsertMapping } from './dto/user-insert.dto'

import { Err } from "neverthrow";
import UserFactory from "src/modules/user/domain/user-factory";
import { EmailVO } from "src/modules/user/domain/value-objects/email.vo";
import { IError } from "../helpers/ierror";

export default class {
    constructor(private application: UserApplication) {
        // Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
        this.insert = this.insert.bind(this)
        this.list = this.list.bind(this)
        this.listOne = this.listOne.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
      }
/*La función next() es un argumento que se pasa a cada función de middleware en Express. Cuando se llama a next(), le indica a Express que pase el 
control a la siguiente función de middleware. 
Esto es útil cuando deseas ejecutar una serie de funciones de middleware en orden, donde cada una realiza una tarea específica.
*/
    async insert ( req: Request, res:Response,next:NextFunction): Promise<void>{  
        const {name,lastname,email,password} = req.body
        const emailResult = EmailVO.create(email)
        if (emailResult.isErr()){
            const err: IError = new Error(emailResult.error.message)
            err.status=411
            return next(err)

        }
        const userResult = await new UserFactory().create(name, lastname, emailResult.value, password)

        if (userResult.isErr()) {
          const err: IError = new Error(userResult.error.message)
          err.status = 411
          return next(err)
        } else {
          const data = await this.application.insert(userResult.value)
          const result = new UserInsertMapping().execute(data.properties())
          res.status(201).json(result)
        }

    }

    async list(req:Request,res:Response){
        //debemos llamar aplicacion.
    }
    async listOne(req:Request,res:Response){}
    async update(req:Request,res:Response){}
    async delete(req:Request,res:Response){}

}