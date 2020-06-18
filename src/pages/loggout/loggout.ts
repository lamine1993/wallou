import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { DatabaseService, Sql } from '../../providers';

/**
 * Generated class for the LoggoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggout',
  templateUrl: 'loggout.html',
})
export class LoggoutPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public events: Events ,
              public platform: Platform,  
              public localStockage:Sql, 
              public db :DatabaseService) {
      if(this.platform.is('android')){
            this.localStockage.remove('token')
            .then(()=>this.db.removeAllUser())
            .then((data)=>{
             console.log("utilisateur supprimé");
             this.events.publish('user:loggedout')
             this.navCtrl.setRoot(HomePage);
          })
      }else 
      {
        this.db.removeAllUser()
        .then((data)=>{
             console.log("utilisateur supprimé "+ JSON.stringify(data));
             sessionStorage.removeItem("token")
             this.events.publish('user:loggedout')
             this.navCtrl.setRoot(HomePage);
          })
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggoutPage');
  }

}
