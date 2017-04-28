import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ElementoolApi } from "../providers/elementool-api";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public api: ElementoolApi) {
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
         console.log(error);
          });
      });
  }
   
    isAuthenticated(){
     
   }

}