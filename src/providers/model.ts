
export interface Personne{
	nom?: string,
    prenom?: string, 
	age?:string,
	telephone?:string,
	adresse?:string,			
}

export interface Usager{
    nom?: string,
    prenom?: string, 
	age?:string,
	sexe?:string,
	telephone?:string,
	groupe_sanguin?:string,
	maladie?: string,
	traitement?:string,
	allergie?:string, 
	autre_information?:string,
	contact_1?:string,
    contact_2?:string,
	date_ajout?:string,
	date_modification?:string,
	user_id?:number
}

export interface User{
	    firstName?: string,
    	lastName?: string, 
		imageUrl?: string,
		email?: string,
		login: string,
		password: string
}

 //prenom TEXT, identifiant TEXT, motDePasse TEXT, naissance TEXT, telephone TEXT, groupe_sanguin TEXT, maladie TEXT, traitement TEXT, allergie TEXT, autre_information TEXT, contact_1 TEXT, contact_2 TEXT,