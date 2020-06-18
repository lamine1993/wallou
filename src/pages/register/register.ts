import { Register2Page } from './../register2/register2';
import { Usager, User } from './../../providers/model';
import { UsagerServiceProvider } from './../../providers/usager.service';
import { LoginPage } from './../login/login';
import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
private registerForm : FormGroup;
  usager: Usager;
  user: User;
  constructor( public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.initForm();
  }


  ionViewDidLoad() {
    //this.initForm();
    
  }

   initForm() {
        this.registerForm = this.formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          naissance: [''],
          age: [''],
          sexe: [''],
          telephone: ['', Validators.required],
          email: ['', Validators.email],
          login: ['', Validators.required],
          pwd: ['', Validators.required],
        });
  }

  onSubmitForm(){
        this.usager= {
            nom:this.registerForm.get('nom').value,
            prenom: this.registerForm.get('prenom').value,
            age:this.registerForm.get('age').value,
            telephone:this.registerForm.get('telephone').value,    
        }
        this.user={
          lastName:this.registerForm.get('nom').value,
          firstName: this.registerForm.get('prenom').value,
          email:this.registerForm.get('email').value ,
          login:this.registerForm.get('login').value,
          password:this.registerForm.get('pwd').value
        }
      this.navCtrl.push(Register2Page, {user: this.user, usager: this.usager })
     
  }

}
