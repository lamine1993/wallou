import { NgModule} from '@angular/core';
import { UsagerFormComponent} from './usager-form/usager-form';
import { IonicModule} from "ionic-angular";
import { LoginFormComponent} from './login-form/login-form';
import { LocalisationComponent} from './localisation/localisation';
import { UsagerForm2Component} from './usager-form2/usager-form2';
@NgModule({
	declarations: [UsagerFormComponent,
    LoginFormComponent,
    LocalisationComponent,
    UsagerForm2Component],
	imports: [IonicModule],
	exports: [UsagerFormComponent,
    LoginFormComponent,
    LocalisationComponent,
    UsagerForm2Component]
})
export class ComponentsModule {}
