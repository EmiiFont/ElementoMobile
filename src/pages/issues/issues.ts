import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ElementoolApi } from "../../providers/elementool-api";

@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html'
})
export class IssuesPage {

  public issueList: Array<any>;
  public title: string = "Issues";

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ElementoolApi, public alertCtrl: AlertController) {
   let report = navParams.get('reportObj');
   let searchTerm = navParams.get('searchTerm');
   
   console.log(report);
   console.log(searchTerm);
   if(report !== undefined){
    this.title = "Issues by report"
    this.loadReportIssues(report.Id);

   }
   if(searchTerm !== undefined){
      this.doSearch(searchTerm);
   }

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

  doSearch(term){
      this.api.searchIssues(term).subscribe(data => {
            let issueList = data.json();
            this.issueList = issueList.value;
            console.log(data.json());
      }, error => {
         console.log(error);
      });
  }

  viewIssueDetail(issue){
    console.log(issue);
  }

   showSearch(){
    let prompt = this.alertCtrl.create({
      title: 'Search',
      message: "Search by ticket number, description or title",
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
            this.doSearch(searchTerm);
          }
        }
      ]
    });
    prompt.present();
  }

  addNewIssue(){
    console.log("Adding new issue");
  }
  
}
