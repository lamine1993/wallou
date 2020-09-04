import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, MenuController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private statusBar: StatusBar) {
     //this.menuCtrl.enable(false, 'myMenu');
     this.statusBar.overlaysWebView(true);
     this.statusBar.hide()
  }

  gotoRegister(){
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 1000
    }
    this.navCtrl.push(RegisterPage,  {}, animationsOptions);
  }

  gotoLogin(){
    const animationsOptions = {
      animation: 'ios-transition',
      duration: 1000
    }

    this.navCtrl.push(LoginPage,  {}, animationsOptions);
  }

}
