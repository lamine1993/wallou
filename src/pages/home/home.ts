import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, MenuController  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
     //this.menuCtrl.enable(false, 'myMenu');
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }

  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

}
