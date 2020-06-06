import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Usager, User } from './model';
import {UsagerServiceProvider} from './usager.service';


/*
  Generated class for the MeteoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestService{
    user: User={
      firstName: "string",
      lastName: "string",
      imageUrl: "string",
      email: "string",
      login: "string",
      password: "string"
    };
  constructor( public platform: Platform, public c_service: UsagerServiceProvider) {
       platform.ready().then(() => {
             //console.log("donnée conseil "+JSON.stringify(this.user))
             //c_service.register(this.user, "1234").then(data=>{
             // console.log("donnée conseil "+JSON.stringify(data))
             // })
          //c_service.login("admin", "adminw@llou2020").subscribe(data=>{
           // console.log("loging.......")
           // console.log(JSON.stringify(data));
          //})
         /* c_service.addUser(this.user).subscribe(data=>{
              console.log("register.......")
              console.log(JSON.stringify(data));
          })*/
    });
  }

  
  }