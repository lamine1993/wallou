import { Sql } from './../providers/sql';
import { UrgencePage } from './../pages/urgence/urgence';
import { RegisterPage } from './../pages/register/register';
import { TestService } from './../providers/testservice';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public ts: TestService, public localStockage:Sql) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: UrgencePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.platform.is('android')){
          this.localStockage.getJson('currentUser')
          .then((data)=>{
            this.currentUser=data;
            this.rootPage =UrgencePage ;
          }).catch(()=>{
            this.rootPage = HomePage;
          })
      }else 
      {
        this.currentUser=sessionStorage.getItem('currentUser')
        this.rootPage = this.currentUser? UrgencePage : HomePage;
      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

logout(){
 if(this.platform.is('android')){
          this.localStockage.remove('currentUser').then(()=>{
            this.nav.setRoot(HomePage);
          })
      }else 
      {
        sessionStorage.removeItem("currentUser");
        this.nav.setRoot(HomePage);
      }
}

}
