import express, { Application } from 'express'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'
import routerHealt from './helpers/health'
import HandlerErrors from './helpers/errors'
import compression from 'compression'
import routerUser from './modules/user/interfaces/http/user.routes'
class App {
	readonly expressApp: Application
	constructor() {
		this.expressApp = express()
		this.owaspSecurityMiddlewares()
		this.mountHealtCheck()
		this.mountMiddlewares()
		this.mountRoutes()
		this.mountError()
	}


	owaspSecurityMiddlewares() {
		this.expressApp.use(hpp())
		this.expressApp.use(helmet())
		this.expressApp.use(
		  cors({
			 origin: '*',
			 optionsSuccessStatus: 200,
			 methods: ['GET', 'POST', 'PUT', 'DELETE'],
		  }),
		)
	 }
	mountHealtCheck() {
		this.expressApp.use('/', routerHealt)
	}

	mountMiddlewares() {
		this.expressApp.use(compression())
		this.expressApp.use(express.json())
		this.expressApp.use(express.urlencoded({ extended: true }))
	 }
	mountError(): void {
		this.expressApp.use(HandlerErrors.notFound)
	}

	mountmiddleware(): void {
		this.expressApp.use(express.json())
		this.expressApp.use(express.urlencoded({ extended: true }))
	}

	mountRoutes(): void {
		this.expressApp.use('/user', routerUser)
	}
}

export default new App().expressApp
