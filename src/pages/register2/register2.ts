import { Sql } from './../../providers/sql';
import { UrgencePage } from './../urgence/urgence';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { Usager, User } from './../../providers/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsagerServiceProvider } from '../../providers';
import { NgZone } from '@angular/core';
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
export class Register2Page implements OnInit {
private registerForm : FormGroup;
  usager: Usager;
  user: User;
  groupSanguin: Array<{id:number, libelleGroupeSanguin: string}>=[]
  

  constructor(private zone: NgZone, 
             public platform: Platform,  
             public localStockage:Sql, 
             private formBuilder: FormBuilder, 
             public navCtrl: NavController, 
             public navParams: NavParams,  
             public authService:UsagerServiceProvider,
             public events:Events) {

   
    this.initForm();
    this.user=this.navParams.get("user");
    this.usager=this.navParams.get("usager");
    console.log("user "+ JSON.stringify(this.user));
    console.log("usager "+JSON.stringify(this.usager));
  }


  ngOnInit(){
     console.log('ngOnInit Register2Page');
    this.authService.groupeSanguins().subscribe(data=>{
       this.groupSanguin=data
       this.refresh();
    })
  }

refresh() {
  this.zone.run(() => {
    console.log('force update the screen');
  });
}

  ionViewDidLoad() {
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
        this.usager.groupe_sanguin=this.registerForm.get('groupesanguin').value;
        this.usager.maladie=this.registerForm.get('maladie').value,
        this.usager.traitement=this.registerForm.get('traitement').value,
        this.usager.allergie=this.registerForm.get('allergie').value, 
        this.usager.contact_1=this.registerForm.get('contact1').value,
        this.usager.contact_2=this.registerForm.get('contact2').value,
        
        console.log("groupe sanguin value "+this.usager.groupe_sanguin)
        this.authService.addUser(this.user).subscribe((data)=>{
            if(data){
              this.user.id=data['id'];
              this.usager.user_id=this.user.id;
              //console.log("id user: "+this.user.id);
              this.authService.addUsager(this.usager).subscribe((data)=>{
                 this.authService.login(this.user.login, this.user.password).subscribe((data)=>{
                    if(data){
                      console.log("connection reussi: "+ JSON.stringify(data))
                      this.events.publish('user:logged')
                      this.navCtrl.setRoot(UrgencePage)
                    }
                 })
              },(error)=>{
                  console.log("error when registring usager :"+ JSON.stringify(error))
              })
            }
        },(error)=>{
                  console.log("error when registring user :"+ JSON.stringify(error))
        })
     
  }


}
