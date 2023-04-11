import { Request, Response } from 'express'

//vamos a definir una clase anonima, la cual luego será representda por un alias
export default class {
	static notFound(_req:Request, res:Response): void {
		res.status(404).send('Not Found')
	}

}
