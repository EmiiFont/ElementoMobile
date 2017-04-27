import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";


/*
  Generated class for the ElementoolApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ElementoolApi {
  
  private localStorage: any;
  private baseUrl: string = 'http://elementtoolwebapi.azurewebsites.net/api';
  private odataUrl: string = 'http://elementtoolwebapi.azurewebsites.net/odata/'
  // private baseUrl: string = 'http://localhost:12597/api';
  private requestOptions: RequestOptions;

  constructor(public http: Http, public storage: Storage) {
     this.storage.ready().then(() => {
             this.localStorage = this.storage;
      });
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     this.requestOptions = new RequestOptions({ headers: headers });
  }

  authenticateUser(user){
   return this.http.post(this.baseUrl + '/Auth', JSON.stringify(user), this.requestOptions);
  }

  public getIssuesByReportId(reportId){
    
    //Issues(reportId)?$top=10&$orderby=Id desc
    return this.getAuthHeaders().flatMap( api_token => {

      if( api_token ) {
        // add Authorization header
        console.log(api_token);
        this.requestOptions.headers.append('Authorization', 'Bearer ' + api_token);
      }
      // make request 
      return this.http.get(this.odataUrl + '/Issues('+ reportId +')?$top=10&$orderby=Id desc', this.requestOptions);
      });
  }

  public getReportsList(){

    return this.getAuthHeaders().flatMap( api_token => {

      if( api_token ) {
        // add Authorization header
        console.log(api_token);
        this.requestOptions.headers.append('Authorization', 'Bearer ' + api_token);
      }
      // make request 
      return this.http.get(this.baseUrl + '/Reports', this.requestOptions);
      });
  }

  public verifyUser(){
    return this.getAuthHeaders().flatMap( api_token => {

      if( api_token ) {
        // add Authorization header
        console.log("validate :" + api_token);
       
        this.requestOptions.headers.append('Authorization', 'Bearer ' + api_token);
        ;
      }
      // make request 
      return this.http.get(this.baseUrl + '/Auth', this.requestOptions);
      });
  }
 
  private getAuthHeaders() {
    this.requestOptions.headers.delete('Authorization');
   return Observable.fromPromise(this.localStorage.get('jwt'));
   }
}
