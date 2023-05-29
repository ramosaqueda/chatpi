import { NextFunction, Request, Response } from 'express'
import UserApplication from '../../application/user.application'
import UserFactory from '../../domain/user-factory'
import { EmailVO } from '../../domain/value-objects/email.VO'
import { IError } from '../helpers/ierror'
import { GuidVO } from '../../domain/value-objects/guid.vo'
import { UserInsertMapping } from './dto/user-insert.dto'
import { UserListOneMapping } from './dto/user-list-one.dto'
import { UserUpdateMapping } from './dto/user-update.dto'
import { UserDeleteMapping } from './dto/user-delete.dto'
import { UserListMapping } from './dto/user-list.dto'

export default class {
	constructor(private application: UserApplication) {
		// Design Pattern Mediator: https://refactoring.guru/es/design-patterns/mediator
		this.insert = this.insert.bind(this) //desde la especificacion desde este controlador, cuando se llame desde afuera, apunte a una referencia de esta clases/ esto simplifica las rutas
		this.list = this.list.bind(this)
		this.listOne = this.listOne.bind(this)
		this.update = this.update.bind(this)
		this.delete = this.delete.bind(this)
	}
	/*La función next() es un argumento que se pasa a cada función de middleware en Express. Cuando se llama a next(), le indica a Express que pase el
control a la siguiente función de middleware.
Esto es útil cuando deseas ejecutar una serie de funciones de midd
 leware en orden, donde cada una realiza una tarea específica.
*/


	async insert(req: Request, res: Response, next: NextFunction) {
		 const { name, lastname, email, password } = req.body
		const emailResult = EmailVO.create(email)
		if (emailResult.isErr()) {
		const err: IError = new Error(emailResult.error.message)
		err.status = 411
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
		res.status(200).json({"message":"ok"})
	}


	async list(_req: Request, res: Response) {
		const list = await this.application.list()
		const result = new UserListMapping().execute(list.map(user => user.properties()))
		res.json(result)
	}
	async listOne(req: Request, res: Response, next: NextFunction) {
		//debemos llamar aplicacion.
		const { guid } = req.params
		const guiResult = GuidVO.create(guid)
		if (guiResult.isErr()) {
			const err: IError = new Error(guiResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const userResult = await this.application.listOne(guid)
			if (userResult.isErr()) {
				return res.status(404).json({ message: userResult.error.message })
			} else if (userResult.isOk()) {
				const result = new UserListOneMapping().execute(userResult.value.properties())
				//return res.status(200).json(result)
				return res.json(result) //por defecto, cuando el resultado es OK retorna el 200
			}
		}
	}
	async update(req: Request, res: Response, next: NextFunction) {
		const { guid } = req.params
		const fieldsToUpdate = req.body //objeto con los rgistros que desamos modificar
		const guidResult = GuidVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const dataResult = await this.application.update(guid, fieldsToUpdate)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 411
			return next(err)
		} else {
			const result = new UserUpdateMapping().execute(dataResult.value.properties())
			return res.json(result)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const guid = req.params.guid
		 

		const guidResult = GuidVO.create(guid)
		if (guidResult.isErr()) {
			const err: IError = new Error(guidResult.error.message)
			err.status = 411
			return next(err)
		}
		const dataResult = await this.application.delete(guid)
		if (dataResult.isErr()) {
			const err: IError = new Error(dataResult.error.message)
			err.status = 404
			return next(err)
		} else {
			const result = new UserDeleteMapping().execute(dataResult.value.properties())
			return res.json(result)
		}
	}
}
