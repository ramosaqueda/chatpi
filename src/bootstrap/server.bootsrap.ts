import http from 'http'
import { Application } from 'express'
import { Bootstrap } from './base.bootsrap'
export default class extends Bootstrap {
	constructor(private readonly app: Application) {
		super()
	}
	initialize() {
		return new Promise<string | Error>((resolve, _reject) => {
			const server = http.createServer(this.app)
			server.listen(3000).on('listening', () => {
				resolve('Promesa resuelta con éxito')
				console.log('Listening on http://localhost:3000')
			}) //evento que se propaga para definir que en el puerto de expo. se esta ejecutando correctamente
		})
	}
}
