import { Component } from '@angular/core';

/**
 * Generated class for the LabelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'label',
  templateUrl: 'label.html'
})
export class LabelComponent {

  text: string;

  constructor() {
    console.log('Hello LabelComponent Component');
    this.text = 'Hello World';
  }

}
