import { DataSource } from 'typeorm'
import { Bootstrap } from './base.bootstrap'
import { UserEntity } from '../modules/user/infraestructure/user.entity' //ingrsar como ruta relativa

let appDataSource: DataSource

export default class extends Bootstrap {
	initialize(): Promise<DataSource> {
		const AppDataSource = new DataSource({
			type: 'mysql', //driver utilizado
			host: 'localhost',
			port: 3308,
			username: 'adminUser',
			password: '12345',
			database: 'chatpi',
			synchronize: true,
			logging: true, //visualizar el log de la consulta por la terminal, practico para desarrollo. *
			entities: [UserEntity], //array que recibirá las especificaciones de las entidades. *
			migrations: [], //se pueden realizar modificaciones en la base de datos sin perder los datos existentes y sin la necesidad de realizar cambios manuales en el esquema de la base de datos.
			subscribers: [], // permite definir observadores de procesos.
		})

		appDataSource = AppDataSource

		return AppDataSource.initialize()
	}

	static get dataSource(): DataSource {
		return appDataSource
	}
}
