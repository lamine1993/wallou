import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the LocalisationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'localisation',
  templateUrl: 'localisation.html'
})
export class LocalisationComponent {

  text: string;

  constructor() {
    console.log('Hello LocalisationComponent Component');
    this.text = 'Hello World';
  }

}
