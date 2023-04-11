export abstract class Bootstrap {
	//definimos una clase abstracta para que sea implementada por 
	abstract initialize():Promise<string| Error>
}
