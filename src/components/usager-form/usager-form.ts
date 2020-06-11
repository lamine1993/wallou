import { Usager, User } from './../../providers/model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the UsagerFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'usager-form',
  templateUrl: 'usager-form.html'
})
export class UsagerFormComponent implements OnInit {

  private registerForm : FormGroup;
  usager: Usager;
  user: User;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    //this.mode = this.navParams.get('mode');
    this.initForm();
  }


  initForm() {
        this.registerForm = this.formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          naissance: [''],
          age: [''],
          sexe: [''],
          telephone: ['', Validators.required],
          groupesanguin: [''],
          maladie: [''],
          traitement: [''],
          allergie: [''],
          contact1: [''],
          contact2: [''],
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
           // adresse:this.registerForm.get('adresse').value,
           // groupe_sanguin:this.registerForm.get('groupesanguin').value,
            //maladie: this.registerForm.get('maladie').value,
            //traitement:this.registerForm.get('traitement').value,
            //allergie:this.registerForm.get('allergie').value, 
            //contact_1:this.registerForm.get('contact1').value,
            //contact_2:this.registerForm.get('contact2').value,     
        }
        this.user={
          lastName:this.registerForm.get('nom').value,
          firstName: this.registerForm.get('prenom').value,
          login:this.registerForm.get('login').value,
          password:this.registerForm.get('pwd').value
        }
     
  }

}
