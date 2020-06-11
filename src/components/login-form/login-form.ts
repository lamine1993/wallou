import { UrgencePage } from './../../pages/urgence/urgence';
import { Usager, UsagerServiceProvider, Sql } from './../../providers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent implements OnInit {

  private loginForm : FormGroup;
  pwd: string;
  constructor(public platform: Platform, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public authService:UsagerServiceProvider, public localStockage:Sql) {
  }

  ngOnInit() {
    //this.mode = this.navParams.get('mode');
    this.initForm();
  }


  initForm() {
        this.loginForm = this.formBuilder.group({
          login: ['', Validators.required],
          pwd: ['', Validators.required],
        });
  }

  onSubmitForm(){
        let  user ={
            login:this.loginForm.get('login').value,
            pwd:this.loginForm.get('pwd').value  
        }
        this.authService.login(user.login, user.pwd/*'admin','adminw@llou2020'*/).subscribe(data=>{
            if(data){

              sessionStorage.setItem("currentUser", JSON.stringify(data));
              if(this.platform.is('android')){
                this.localStockage.setJson('currentUser', data ).then(()=>{
                   this.navCtrl.setRoot(UrgencePage)
                })
              }else this.navCtrl.setRoot(UrgencePage)
            }
        })
  }
}
