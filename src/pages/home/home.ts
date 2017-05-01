import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { IssuesPage } from '../issues/issues';
import { NewIssuePage } from '../newIssue/newIssue';
import { ElementoolApi } from '../../providers/elementool-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public reportList: Array<any>;

  constructor(public navCtrl: NavController, public api: ElementoolApi,  public alertCtrl: AlertController) {
    this.showReports();
  }
   
   showReports(){
     this.api.getReportsList().subscribe(data => {
            this.reportList = data.json();
            console.log(this.reportList);
      }, error => {
         console.log(error);
      });
   }
   
   getIssuesByReportId(report){
    this.navCtrl.push(IssuesPage, {
        reportObj: report
    });
     
   }

   addNewIssue(){
       this.navCtrl.push(NewIssuePage, {
        reportObj: ""
    });
  }

  showSearch(){
    let prompt = this.alertCtrl.create({
      title: 'Search',
      message: "Search by ticket number or title",
      inputs: [
        {
          name: 'searchbox',
          placeholder: 'Search...'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Search',
          handler: data => {
            var searchTerm = data.searchbox;
            this.doSearch(data);
          }
        }
      ]
    });
    prompt.present();
  }

  doSearch(term){
     this.navCtrl.push(IssuesPage, {
        searchTerm:term.searchbox
    });
  }

}
