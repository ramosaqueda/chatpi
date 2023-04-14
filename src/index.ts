import ServerBoostrap from './bootstrap/server.bootsrap'
import { Bootstrap } from './bootstrap/base.bootsrap'
import Application from './app'
import serverBootsrap from './bootstrap/server.bootsrap'

const serverBoostrap: Bootstrap = new ServerBoostrap(Application)
;(async () => {
	try {
		const resultServer = await serverBoostrap.initialize()
		console.log(resultServer)
	} catch (error) {
		console.log(error)
	}
})()
