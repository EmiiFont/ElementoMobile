import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ElementoolApi } from "../../providers/elementool-api";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public issueList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ElementoolApi) {
   let report = navParams.get('reportObj');
   this.loadReportIssues(report.Id);
  }
  
  loadReportIssues(reportId){
     this.api.getIssuesByReportId(reportId).subscribe(data => {
            let issueList = data.json();
            this.issueList = issueList.value;
            console.log(this.issueList);
      }, error => {
         console.log(error);
      });
  }
}
