import { Usager } from './model';
export class MapToDataType {
public static getUsagerfromJson(json: Object): Usager {
        let prev: Usager = {
                nom: json['nom'],
                prenom: json['prenom'], 
                age: json['naissance'],
                sexe: json['adresse'],
                telephone: json['telephone'],
                groupe_sanguin: json['groupe_sanguin'],
                maladie: json['maladie'] ,
                traitement: json['traitement'],
                allergie: json['allergie'], 
                autre_information: json['autre_information'],
                contact_1: json['contact_1'],
                contact_2: json['contact_2'],
                date_ajout: json['date_ajout'],
                date_modification: json['date_modification'],
                user_id: json['user_id']
            }
        return prev;
    }

constructor() {
    }
}