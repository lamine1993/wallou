import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocalisationService{

  constructor( public platform: Platform, public geolocation: Geolocation) {
       platform.ready().then(() => {
        this.getLocation();
    });
  }

      getLocation(){
        this.geolocation.getCurrentPosition().then((resp) => {
           console.log(resp.coords.latitude)
           console.log(resp.coords.longitude)
        }).catch((error) => {
          console.log('Error getting location', error);
        });

        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
          console.log(data.coords.latitude)
           console.log(data.coords.longitude)
        });
  }

}