import { Router, Request, Response } from 'express'
class RouterHealth {
	readonly expressRouter: Router
	constructor() {
		this.expressRouter = Router()
	}
	mountroutes() {
		this.expressRouter.get('/', (_req: Request, res: Response) => {
			res.send('Servido cargado Correctamente')
		})
	}
}

export default new RouterHealth().expressRouter
