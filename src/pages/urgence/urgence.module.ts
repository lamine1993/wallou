import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrgencePage } from './urgence';

@NgModule({
  declarations: [
    UrgencePage,
  ],
  imports: [
    IonicPageModule.forChild(UrgencePage),
  ],
})
export class UrgencePageModule {}
