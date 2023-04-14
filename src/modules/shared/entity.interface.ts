export interface IEntity<Properties, PropertiesUpdate> {
	//definiciones genericas para las entidades.
	//utilizaremos tipos genericos Propperties y ProppertiesUpdate para que sean utilizadas independent de la entidad
	properties: () => Properties
	delete: () => void
	update: (fields: Properties) => void
}
