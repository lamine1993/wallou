import { Usager } from './../../providers/model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    //this.mode = this.navParams.get('mode');
    this.initForm();
  }


  initForm() {

        this.loginForm = this.formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          naissance: [''],
          adresse: [''],
          telephone: ['', Validators.required],
          groupesanguin: [''],
          maladie: [''],
          traitement: [''],
          allergie: [''],
          contact1: [''],
          contact2: [''],
          pwd: ['', Validators.required],
        });
  }

  onSubmitForm(){
        let  user ={
            telephone:this.loginForm.get('telephone').value,
            pwd:this.loginForm.get('pwd').value  
        }
     
  }
}
