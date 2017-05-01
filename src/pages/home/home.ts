import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { IssuesPage } from '../issues/issues';
import { ElementoolApi } from '../../providers/elementool-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public reportList: Array<any>;

  constructor(public navCtrl: NavController, public api: ElementoolApi) {
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
    console.log("Adding new issue");
  }

}
