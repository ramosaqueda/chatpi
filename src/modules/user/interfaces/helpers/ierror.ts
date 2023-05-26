export interface IError extends Error {
	status?: number //debolver el status code error al momento de resolver la ruta
}