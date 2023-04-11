import express, { Application } from 'express'
import routerHealt from './helpers/health'
import HandleErrors from './helpers/errors'
class App {
	readonly expressApp: Application
	constructor() {
		this.expressApp = express()
		this.mountHealthCheck()
		this.moutmiddleware()
		/*
		cargar las rutas
		this.mountRoutes()
		this.mountError()
		*/
	}

	mountHealthCheck() {
		this.expressApp.use('/', routerHealt)
	}

	moutmiddleware() {
		this.expressApp.use(express.json())
		this.expressApp.use(express.urlencoded)
	}

	mountError(): void{
		this.expressApp.use(HandleErrors.notFound)
	}
}

export default new App().expressApp
