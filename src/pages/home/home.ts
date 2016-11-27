import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Globals} from "../../models/Globals";
import {Auth} from "../../models/Auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private http: Http;

  constructor(public navCtrl: NavController, http: Http) {
    this.http = http;
    let authToken = Globals.getAuthToken();
    console.log("authToken: " + authToken);
    let header = new Headers({'Content-type': 'application/json'});
    header.append('Authorization', authToken);
    let options = new RequestOptions({headers: header});
    http.get("http://mattfred.com/requests", options).subscribe((response) => {
      console.log(response.json());

    }, (error) => {
      console.log(error);
      switch (error.status) {
        case 401:
          let auth = new Auth(this.http);
          let success = auth.login();
          if (success) this.constructor(navCtrl, http);
          else {
            console.log("didn't work :(")
          }
          break;
      }
    });
  }
}
