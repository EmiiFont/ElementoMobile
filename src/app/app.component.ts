import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ElementoolApi } from "../providers/elementool-api";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public api: ElementoolApi) {
     this.pages = [
      { title: 'Quick Reports', component: HomePage }
      // { title: 'List', component: ListPage }
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
     
      splashScreen.hide();

      this.api.verifyUser().subscribe(data => {
          this.rootPage = HomePage;
      }, error => {
         if(error.status === 401){
          this.rootPage = LoginPage;
           }
          });
      });

      
  }
   
   isAuthenticated(){
     
   }

   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}