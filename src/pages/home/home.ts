import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Globals} from "../../models/Globals";
import {Auth} from "../../models/Auth";
import {SettingsPage} from "../settings/settings";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private requests: any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.requests = [];
    if (!Globals.getPassword()) {
      console.log("auth token null");
      navCtrl.setRoot(LoginPage);
      navCtrl.push(LoginPage);
    } else {
      let authToken = Globals.getAuthToken();
      console.log("authToken: " + authToken);
      let header = new Headers({'Content-type': 'application/json'});
      header.append('Authorization', authToken);
      let options = new RequestOptions({headers: header});
      http.get("http://mattfred.com/requests", options).subscribe((response) => {
        console.log(response.json());
        this.requests = response.json();
      }, (error) => {
        console.log(error);
        switch (error.status) {
          case 401:
            let auth = new Auth(http);
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

  settings() {
    this.navCtrl.push(SettingsPage);
  }
}
