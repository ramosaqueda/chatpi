import { Router } from 'express'
import UserApplication from '../../application/user.application'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infraestructure/UserInfraestructure'
import userController from './user.controller'

const infraestructure: UserRepository = new UserInfraestructure()
const application = new UserApplication(infraestructure)
const controller = new userController(application)

class UserRouter {
	readonly expressRouter: Router

	constructor() {
		this.expressRouter = Router()
		this.mountRoutes()
	}
	mountRoutes() {
		//En eeste caso es importante  ientificar el contexto de ejecución, el caul debe ser refernciado.
		//una opción es usarl el contexto del request y responde  y pasar estos valores a una funcion de flechas. para enviar a resolver el insert.
		/*
			algo asi;
			this.expressRouter.get('/', (req:Request, res:Response) => {
				controller.insert(req,res)
			}
			la otra alternativa se muestrta a continuacion.
			en este caso usaremos un patrón de diseño denominado mediador.
			https://refactoring.guru/es/design-patterns/mediator, esto nos permite decirle a express que
			la especificacion que no conoce (controller.insert) la haga parte de el pero que se resuelva desde otro contexto.



		*/
		// desing pattern chain of responsability: https://refactoring.guru/es/design-patterns/chain-of-responsibility

		this.expressRouter.post('/', controller.insert)
		this.expressRouter.get('/', controller.list)
		this.expressRouter.post('/:guid', controller.listOne)
		this.expressRouter.put('/:guid', controller.update)
		this.expressRouter.delete('/:guid', controller.delete)
	}
}

export default new UserRouter().expressRouter
