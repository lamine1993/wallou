import { NgModule} from '@angular/core';
import { UsagerFormComponent} from './usager-form/usager-form';
import { IonicModule} from "ionic-angular";
import { LoginFormComponent} from './login-form/login-form';
import { LocalisationComponent} from './localisation/localisation';
import { UsagerForm2Component} from './usager-form2/usager-form2';
import { LabelComponent } from './label/label';
@NgModule({
	declarations: [UsagerFormComponent,
    LoginFormComponent,
    LocalisationComponent,
    UsagerForm2Component,
    LabelComponent],
	imports: [IonicModule],
	exports: [UsagerFormComponent,
    LoginFormComponent,
    LocalisationComponent,
    UsagerForm2Component,
    LabelComponent]
})
export class ComponentsModule {}
