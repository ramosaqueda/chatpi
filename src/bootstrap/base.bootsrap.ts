//Facade. (Investigar).https://refactoring.guru/es/design-patterns/facade
export abstract class Bootstrap {
	abstract initialize(): Promise<String | Error>
}
