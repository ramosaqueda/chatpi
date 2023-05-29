import express, { Application } from 'express'
import routerHealt from './helpers/health'
import HandlerErrors from './helpers/errors'
import routerUser from './modules/user/interfaces/http/user.routes'
class App {
	readonly expressApp: Application
	constructor() {
		this.expressApp = express()
		this.mountHealtCheck()
		this.mountRoutes()
		this.mountError()
	}
	mountHealtCheck() {
		this.expressApp.use('/', routerHealt)
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
