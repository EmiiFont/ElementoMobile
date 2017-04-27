import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { TabsPage } from '../tabs/tabs';
import { ElementoolApi } from '../../providers/elementool-api';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  localstorage: any;

  accountName: string;
  userName: string;
  password: string;
  myForm: FormGroup;

  private myData: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public alertCtrl: AlertController, public loadingCtrl:LoadingController,
   public storage: Storage, private builder: FormBuilder, public api:ElementoolApi) {
    
     this.myForm = builder.group({
      'accountName': ['', Validators.required],
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    });

       this.storage.ready().then(() => {
             this.localstorage = this.storage;
            });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  doLogin(formData){
     console.log(formData);
     console.log(this.api);
     
     var user =  {
       AccountName: formData.accountName,
       UserName: formData.userName,
       Password: formData.password
     }
     if(formData.accountName === '' || formData.password === '' || formData.userName === '') {
        // let alert = this.alertCtrl.create({
        //   title:'Register Error', 
        //   subTitle:'All fields are required',
        //   buttons:['OK']
        // });
        // alert.present();
        // return;
      }  

      let loader = this.loadingCtrl.create({
        content: "Logging in...",
        dismissOnPageChange: true
      });

      loader.present();
      
      
      this.api.authenticateUser(user).subscribe(data => {
          var token = data.json();
         
          this.localstorage.set('jwt', token).then(v => {
             this.navCtrl.setRoot(TabsPage);
          });
          
      }, error => {
         loader.dismissAll();

         if(error.status === 401){
           this.errorMessage = "Wrong login credentials";
         }
         console.log(error);
      });
  }
}
