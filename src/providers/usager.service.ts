import { Injectable, EventEmitter } from '@angular/core';
import {MapToDataType} from './modelFromJson'
import { DatabaseService } from './database.service';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Usager, User } from './model';
import {Http, Headers} from '@angular/http';
import {UtilService} from './util.service';
import moment from 'moment';
import {map} from 'rxjs/operators';
import 'rxjs';
import {REGISTER_URL, LOGIN_URL, BASE_URL} from './constantes'
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
   constructor(private jsonp : Http, public localStockage:Sql) {
   }

public register(user: Usager, pwd: string ) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      console.log(JSON.stringify(user))
      this.jsonp.post(BASE_URL+ 'register', user, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
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

public addUserToServer(user: User, emitter:EventEmitter<any>){
  let data={
    activated: true,
    //authorities: ["ROLE_USER"],
    createdBy: user.firstName ,
    createdDate: ''+moment.HTML5_FMT.DATETIME_LOCAL_SECONDS,
    email: "sarr@fdq.dc",
    firstName: user.firstName,
    //"imageUrl": "string",
    //"langKey": "string",
    //lastModifiedBy: moment.HTML5_FMT.DATETIME_LOCAL_SECONDS,
    //lastModifiedDate:moment.HTML5_FMT.DATETIME_LOCAL_SECONDS,
    lastName: user.lastName,
    login: user.login,
    password: user.password
  }
  return this.jsonp.post(BASE_URL+ 'register', {firstName: user.firstName, lastName: user.lastName,createdDate:moment.HTML5_FMT.DATETIME_LOCAL_SECONDS, email: user.email, login:user.login, password: user.password} )
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
            //console.log("resultat connexion ")
            console.log(JSON.stringify(data))
           // this.token = 'Bearer ' + data.id_token;
           // this.access = true;
           emitter.emit(data)
          } else {
            //this.access = false;
            emitter.emit(null)
          }
        });
    }
  }
}