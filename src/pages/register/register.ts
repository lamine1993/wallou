import { Usager } from './../../providers/model';
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
  public userData: Usager;
  public pwd: string;
  public tel:string;

  responseData:any;
  reduit:boolean=false;
  forme:string="reduire";
  action: string="register";
   registerForm: FormGroup;
   loginForm:FormGroup;
  constructor( public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, public authService:UsagerServiceProvider) {
  }

   signup(){
     this.authService.register(this.userData, this.pwd).then((result) => {
      this.responseData = result;
      if(this.responseData.userData){
      console.log(this.responseData);
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
      //this.navCtrl.push(TabsPage);
      }
      else{ console.log("User already exists"); }
    }, (err) => {
      // Error log
    });

  }

  Check_action( new_act){
       this.action=new_act
  }

  reduire(){
    if (this.reduit==false)
    {
      this.reduit=true;
      this.forme="etendre";
    }
    else{
      this.reduit=false;
      this.forme="reduire";
    }
  }

  login(){
    //Login page link
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
