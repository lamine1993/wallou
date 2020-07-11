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
            this.jsonp.get(BASE_URL+"users/"+login, options )
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
                    this.localStockage.setJson("token", token)
                    .then(()=>this.localStockage.setJson("idUser", user.id))
                    .then(rsp=> emitter.emit(d));
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

alerter(lat:number, lng: number){
    let self=this;
    let emitter: EventEmitter<any>= new EventEmitter<any>();
    self.addAlerteToServer(lat, lng, emitter);
    return emitter;
}

addAlerteToServer(lat:number, lng: number,  emitter: EventEmitter<any>){

return this.localStockage.getJson('token').then((resp)=>{
       this.localStockage.getJson('idUser').then((resp2)=>{
         console.log(resp)
         console.log(resp2)
         this.getUsager(resp2, resp).subscribe((response)=>{
           console.log(moment().format().toString(),)
           let usager=response
           let data={
              dateEnvoieAlerte: moment().format().toString(),
              dateIntervention: null,
              interventionYN: false,
              localisation: ""+lat+ "; "+ lng ,
              rejetYN: false,
              resumeIntervention: "", 
              uniteSecoursId: 1,
              usagerId: usager.id
              }

            let headers = new Headers();
            //headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer '+ resp);
            let options = new RequestOptions({ headers: headers });
           this.jsonp.post(BASE_URL+ 'alertes',data, options )
            .map(res => res.json())
            .subscribe( data => {
              if (data) {
              emitter.emit(data)
              } else {
                emitter.emit(null)
              }
            }, error=>{
              console.log("erreur "+JSON.stringify(error))
              emitter.emit(null)
            });
         })
       })
    })
}

public groupeSanguins():Observable<any>{
  let self=this;
  let emitter: EventEmitter<any>= new EventEmitter<any>();
  self.getGroupeSanguin(emitter);
  return emitter;
}

getUsager(id_user :number, token: string):Observable<any>{
    let self=this;
    let emitter: EventEmitter<any>= new EventEmitter<any>();

    self.getUsagerFromServer(id_user, token, emitter)
    return emitter;
}

getUsagerFromServer(id_user :number, token: string, emitter: EventEmitter<any>){
  let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer '+ token);
            let options = new RequestOptions({ headers: headers });
  return this.jsonp.get(BASE_URL+"usagers-user/"+id_user, options )
  .map(res => res.json())
  .subscribe(data=>{
    console.log(data[0]);
    emitter.emit(data[0])
  })
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