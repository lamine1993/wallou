import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-confirm',
  templateUrl: 'modal-confirm.html',
})
export class ModalConfirmPage {

  constructor(public view: ViewController, public navParams: NavParams) {
  }

  closeModal(){
     this.view.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalConfirmPage');
  }

}
