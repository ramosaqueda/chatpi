import express, { Application } from 'express'
import routerHealt from './helpers/health'
import HandlerErrors from './helpers/errors'
class App {
	readonly expressApp: Application
	constructor() {
		this.expressApp = express()
		this.mountHealtCheck()
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
}

export default new App().expressApp
