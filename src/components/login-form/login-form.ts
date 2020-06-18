import { UrgencePage } from './../../pages/urgence/urgence';
import { Usager, UsagerServiceProvider, Sql } from './../../providers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform, Events} from 'ionic-angular';
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
  constructor(public platform: Platform, 
             private formBuilder: FormBuilder,
             public navCtrl: NavController, 
             public navParams:NavParams, 
             public authService:UsagerServiceProvider, 
             public localStockage:Sql,
             public events: Events) {
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
        this.authService.login(user.login, user.pwd).subscribe(data=>{
            if(data){
               console.log("connection reussi: : "+ data)
               this.events.publish('user:logged')
               this.navCtrl.setRoot(UrgencePage)
            }
        })
  }
}
