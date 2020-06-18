import { LoggoutPage } from './../pages/loggout/loggout';
import { LoginPage } from './../pages/login/login';
import { Sql } from './../providers/sql';
import { DatabaseService } from './../providers';
import { UrgencePage } from './../pages/urgence/urgence';
import { RegisterPage } from './../pages/register/register';
import { TestService } from './../providers/testservice';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
 // rootPage: any = UrgencePage;
  currentUser: any=null;
  pages: Array<{title: string, component: any}>;
  constructor(public events: Events ,
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public ts: TestService, 
              public localStockage:Sql, 
              public db :DatabaseService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Acceuil', component: HomePage},
      {title: 'Connexion', component: LoginPage},
      {title: 'Inscription', component: RegisterPage}
    ];

    events.subscribe('user:logged', ()=>{
      this.pages=[
        { title: 'Urgence', component: UrgencePage},
        {title: 'Deconnexion', component: LoggoutPage},
      ]
    });

    events.subscribe('user:loggedout', ()=>{
      this.pages = [
        { title: 'Acceuil', component: HomePage},
        {title: 'Connexion', component: LoginPage},
        {title: 'Inscription', component: RegisterPage}
      ];
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.platform.is('android')){
          this.localStockage.getJson('token')
          .then((data)=>{
            this.currentUser=data;
            this.events.publish('user:logged')
            this.rootPage =UrgencePage ;
          }).catch(()=>{
            this.events.publish('user:loggedout')
            this.rootPage = HomePage;
          })
      }else 
      {
        this.currentUser=sessionStorage.getItem('token')
        if(this.currentUser){
          this.events.publish('user:logged')
          this.rootPage =UrgencePage 
        }else{
          this.events.publish('user:loggedout')
          this.rootPage = HomePage;
        }
      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
