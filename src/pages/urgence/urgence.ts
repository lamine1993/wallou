import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { Sql, UsagerServiceProvider } from '../../providers';
/**
 * Generated class for the UrgencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-urgence',
  templateUrl: 'urgence.html',
})
export class UrgencePage {
  
  constructor(public menuCtrl: MenuController, 
              public navCtrl: NavController,
              private localStockage: Sql, 
              public navParams: NavParams, 
              public geolocation: Geolocation,
              public service_usager: UsagerServiceProvider,
              public toastCtrl: ToastController) {
     //this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrgencePage');
  }

  presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 5000,
    position: 'middle'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
  
  getLocation(){
         let self=this;   
        self.geolocation.getCurrentPosition({timeout: 20000 }).then((resp) => {
            console.log(resp.coords.latitude)
            console.log(resp.coords.longitude)
            this.service_usager.alerter(resp.coords.latitude,resp.coords.latitude).subscribe((data)=>{
              console.log(JSON.stringify(data));
              this.presentToast("Alerte envoie au coordonnées suivant: \nLatitude: "+resp.coords.latitude+ "\nLongitude: "+resp.coords.longitude)
            }, err=>{
              console.log(JSON.parse(err));
            })
        }).catch((error) => {
          console.log('Error getting location',JSON.stringify(error));
        });
  }

}
