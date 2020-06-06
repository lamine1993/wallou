import { Component } from '@angular/core';
import { Usager, User } from './../../providers/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the UsagerForm2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'usager-form2',
  templateUrl: 'usager-form2.html'
})
export class UsagerForm2Component {
  
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
