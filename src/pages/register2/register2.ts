import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usager, User } from './../../providers/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the Register2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {
private registerForm : FormGroup;
  usager: Usager;
  user: User;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register2Page');
  }

   initForm() {

        this.registerForm = this.formBuilder.group({
          groupesanguin: [''],
          maladie: [''],
          traitement: [''],
          allergie: [''],
          contact1: [''],
          contact2: [''],
        });
  }

  onSubmitForm(){
        
        this.usager= {
           //adresse:this.registerForm.get('adresse').value,
            groupe_sanguin:this.registerForm.get('groupesanguin').value,
            maladie: this.registerForm.get('maladie').value,
            traitement:this.registerForm.get('traitement').value,
            allergie:this.registerForm.get('allergie').value, 
            contact_1:this.registerForm.get('contact1').value,
            contact_2:this.registerForm.get('contact2').value,     
        }
     
  }


}
