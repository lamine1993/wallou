import { Injectable, EventEmitter } from '@angular/core';
import { DatabaseService } from './database.service';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Usager, User, Alerte } from './model';
import {Http, Headers, RequestOptions} from '@angular/http';
import {UtilService} from './util.service';
import moment from 'moment';
import {map} from 'rxjs/operators';
import 'rxjs';
import {BASE_URL} from './constantes'
import { Sql } from './sql';
/*
  Generated class for the UsagerServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsagerServiceProvider {
   isAuth= false;
   token: string;
   access:boolean;
   public usager: Usager;
   constructor(public platform: Platform, private jsonp : Http, public localStockage:Sql, public localBase:DatabaseService) {
   }

public login(login, pwd):Observable<any>{
  let self = this;
  let emitter: EventEmitter<any> = new EventEmitter<any>();
  self.getLogin(login, pwd, emitter)
  return emitter;
}

public addUser(user: User):Observable<any>{
  let self=this;
  let emitter: EventEmitter<any>= new EventEmitter<any>();
  self.addUserToServer(user, emitter);
  return emitter;
}

public addUsager(user: Usager):Observable<any>{
  let self=this;
  let emitter: EventEmitter<any>= new EventEmitter<any>();
  self.addUsagerToServer(user, emitter);
  return emitter;
}

public addUsagerToServer(user: Usager, emitter:EventEmitter<any>){
  let data={
    adresse: "",
    age: user.age,
    allergie: user.allergie,
    contact1: user.contact_1,
    contact2: user.contact_2,
    dateAjout: moment().format("YYYY-MM-DD"),
    dateModification: moment().format("YYYY-MM-DD"),
    groupeSanguinId: user.groupe_sanguin,
    maladie: user.maladie,
    nom: user.nom,
    prenom: user.prenom,
    telephone: user.telephone,
    traitement: user.traitement,
    userId: user.user_id
  }
  return this.jsonp.post(BASE_URL+ 'usagers', data )
        .map(res => res.json())
        .subscribe( data => {
           emitter.emit(data)
        }, error=>{
          emitter.emit(null)
          console.log("error.. "+ JSON.stringify(error))
        });
}

public addUserToServer(user: User, emitter:EventEmitter<any>){
  let data={
    activated: true,
    authorities: ["ROLE_USER"],
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    login: user.login,
    password: user.password
  }
  return this.jsonp.post(BASE_URL+ 'register', data )
        .map(res => res.json())
        .subscribe( data => {
           emitter.emit(data)
        }, error=>{
          emitter.emit(null)
          console.log("error.. "+ JSON.stringify(error))
        });
}

public getLogin(login, pwd, emitter: EventEmitter<any>) {
    if (login === null || pwd === null) {
      return Observable.throw("Please insert credentials.");
    } else {
       return this.jsonp.post(BASE_URL+ 'authenticate', {username: login, password: pwd})
        .map(res => res.json())
        .subscribe( data => {
          if (data) {
            let token=data.id_token;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer '+data.id_token);
            let options = new RequestOptions({ headers: headers });
            this.jsonp.get("http://vps-8d31b175.vps.ovh.net:8080/wallou/api/users/"+login, options )
            .subscribe((data_bis)=>{
               let user: User;
               let d=JSON.parse(data_bis['_body'])
               user={
                 id: d.id,
                 firstName:d.firstName,
                 lastName:d.lastName,
                 login:d.login,
                 password:d.password
               }
               console.log(user)
               this.localBase.addUser(user).then((resp)=>{
                  if(this.platform.is('android')){
                    this.localStockage.setJson("token", token).then(rsp=> emitter.emit(d))
                  // })
                  }else{
                    sessionStorage.setItem("token", token );
                    emitter.emit(d)
                  }
               })
            })
          } else {
            emitter.emit(null)
          }
        }, error=>{
          console.log("login et mot de passe erronés \n"+ JSON.stringify(error))
          emitter.emit(null)
        });
    }
  }

addAlerte(alerte: Alerte,  emitter: EventEmitter<any>){
  let data={
	dateEnvoieAlerte: moment().format("YYYY-MM-DD"),
	dateIntervention: null,
	interventionYN: false,
	localisation: alerte.localisation,
	rejetYN: false,
	resumeIntervention: "",
	uniteSecoursId: 1,
	usagerId: alerte.usagerId
  }
 return this.jsonp.post(BASE_URL+ 'usager',data)
        .map(res => res.json())
        .subscribe( data => {
          if (data) {
            //console.log("resultat connexion ")
            console.log(JSON.stringify(data))
           // this.token = 'Bearer ' + data.id_token;
           // this.access = true;
           emitter.emit(data)
          } else {
            //this.access = false;
            emitter.emit(null)
          }
        }, error=>{
          console.log("login et mot de passe erronés \n"+ JSON.stringify(error))
        });
}

public groupeSanguins():Observable<any>{
  let self=this;
  let emitter: EventEmitter<any>= new EventEmitter<any>();
  self.getGroupeSanguin(emitter);
  return emitter;
}

getGroupeSanguin(emitter: EventEmitter<any>){
  return this.jsonp.get(BASE_URL+"groupe-sanguins")
  .map(res => res.json())
  .subscribe(data=>{
    console.log();
    emitter.emit(data)
  })
}

}