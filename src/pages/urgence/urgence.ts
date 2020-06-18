import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
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
  
  constructor(public menuCtrl: MenuController, public navCtrl: NavController,private toast: Toast, public navParams: NavParams, public geolocation: Geolocation) {
     //this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrgencePage');
  }
  
  getLocation(){
         let self=this;   
        self.geolocation.getCurrentPosition({timeout: 20000 }).then((resp) => {
            console.log(resp.coords.latitude)
            console.log(resp.coords.longitude)
            this.toast.show('latitude: '+resp.coords.latitude+' longitude: '+resp.coords.longitude, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
        }).catch((error) => {
          console.log('Error getting location',JSON.stringify(error));
        });
  }

}
