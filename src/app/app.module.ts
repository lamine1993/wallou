import { Register2Page } from './../pages/register2/register2';
import { UrgencePage } from './../pages/urgence/urgence';
import { ComponentsModule } from './../components/components.module';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { JsonpModule } from '@angular/http';
import {HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { UsagerServiceProvider, TestService, DatabaseService, Sql, LocalisationService } from '../providers';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    UrgencePage,
    Register2Page
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    UrgencePage,
    Register2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseService,
    UsagerServiceProvider,
    TestService,
    Sql,
    Geolocation,
    LocalisationService,
    Toast
  ]
})
export class AppModule {}
