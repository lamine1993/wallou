import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoggoutPage } from './loggout';

@NgModule({
  declarations: [
    LoggoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LoggoutPage),
  ],
})
export class LoggoutPageModule {}
