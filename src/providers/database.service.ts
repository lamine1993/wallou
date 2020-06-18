import { Usager, User } from './model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sql } from './sql';
/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseService {
  private table_usager='usager';
  private table_user='user';

  constructor(public _db: Sql) {
  }

  addUser(user: User): Promise<Number>{
    let createTableUser: string='create table if not exists '+this.table_user+' (id_user integer, nom TEXT, prenom TEXT, login TEXT, pwd TEXT NOT NULL)'
    let insertQuery:string='insert or replace into '+this.table_user+ ' (id_user, prenom, nom, login, pwd) values (?, ?, ?, ?, ?)'
    let self=this;
    return self._db.query(createTableUser)
           .then(()=>self._db.query(insertQuery, [user.id, user.firstName, user.lastName, user.login, user.password]))
           .then((data) => {
            console.log(data.res);
            return data.res.insertId;
          }).catch((error) => {
            console.log(error);
            return 0;
          })
  }

  removeAllUser():Promise<any>{
    let removeQuery:string='delete from '+this.table_user;
    let self=this;
    return self._db.query(removeQuery).then((data)=>{
        console.log(data.res);
    }).catch((error)=>{
       console.log(error);
    })
  }

  addUsager(usager: Usager): Promise<Number>{
    let createTableUsager: string='create table if not exists '+this.table_usager +' (id INTEGER AUTOINCREMENT,idUser INTEGER, nom TEXT,  prenom TEXT, age TEXT, sexe TEXT, telephone TEXT NOT NULL UNIQUE, groupe_sanguin TEXT, maladie TEXT, traitement TEXT, allergie TEXT, autre_information TEXT, contact_1 TEXT, contact_2 TEXT, date_ajout TEXT, date_modification TEXT, user_id INTEGER )'
    let insertQuery: string = 'INSERT OR REPLACE INTO ' + this.table_usager + ' (nom,  prenom, age, sexe, telephone, groupe_sanguin, maladie, traitement, allergie, autre_information, contact_1, contact_2, date_ajout, date_modification, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let self = this;
    return self._db.query(createTableUsager)
        .then(() => self._db.query(insertQuery, [usager.nom,usager.user_id, usager.prenom, usager.age, usager.sexe, usager.telephone, usager.groupe_sanguin, usager.maladie, usager.traitement, usager.allergie, usager.autre_information, usager.contact_1, usager.contact_2, usager.date_ajout, usager.date_modification, usager.user_id]))
        .then((data) => {
          console.log(data.res);
          return data.res.insertId;
        }).catch((error) => {
          console.log(error);
          return 0;
        })
  }
  
 getUsager(): Promise<Usager> {
    let getQuery: string = 'SELECT nom,  prenom, naissance, adresse, telephone, groupe_sanguin, maladie, traitement, allergie, autre_information, contact_1, contact_2, date_ajout, date_modification, user_id FROM ' + this.table_usager;
    let user: Usager;
    return this._db.query(getQuery)
      .then(data => {
        if (data.res.rows.length > 0) {
            let obj: any = data.res.rows.item(0);
            user= JSON.parse(obj)
            return user
        }
        return null;
      })
      .catch(error => {
        console.error('Getting  error -> ' + error.err.message);
        return null;
      });
  }
}
