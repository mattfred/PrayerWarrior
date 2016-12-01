import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
import {PrayerRequest} from "../../models/PrayerRequest";
import {Globals} from "../../models/Globals";
import {Toast} from 'ionic-native';
import {LoginPage} from "../login/login";
import {Auth} from "../../models/Auth";

/*
  Generated class for the NewRequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-request',
  templateUrl: 'new-request.html'
})
export class NewRequestPage {

  public title: string;
  public details: string;
  public isPublic: boolean;

  constructor(public navCtrl: NavController, public http: Http) {
    if (!Globals.getAuthToken() && !Globals.getPassword()) { // no auth token or password
      this.goToLogin();
    } else if (!Globals.getAuthToken() && Globals.getPassword()) { // no auth token but password is present
      this.tryToLogin();
    }
  }

  onSave() {
    if (this.title && this.details) {
      let newRequest = new PrayerRequest();
      newRequest.title = this.title;
      newRequest.details = this.details;
      newRequest.priority = 0;
      newRequest.isPublic = this.isPublic;
      newRequest.isDeleted = false;
      newRequest.isAnswered = false;
      console.log("New Request: " + newRequest);
      let authToken = Globals.getAuthToken();
      console.log("authToken: " + authToken);
      let header = new Headers({'Content-type': 'application/json'});
      header.append('Authorization', authToken);
      let options = new RequestOptions({headers: header});
      console.log(options);
      this.http.post("http://mattfred.com/saveRequest", newRequest, options).subscribe((response) => {
        this.navCtrl.parent.select(0); // go back to main tab
      }, (error) => {
        switch (error.status) {
          case 401:
            this.tryToLogin();
            break;
          case 500:
            break;
        }
      })
    }
  }

  showToast() {
    Toast.show('Request saved', "short", 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  tryToLogin() {
    let auth = new Auth(this.http);
    let success = auth.login();
    if (success) {
      this.onSave();
    } else {
      this.goToLogin();
      Globals.setPassword(null);
      //this.hideLoading();
    }
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
    //this.hideLoading();
  }

}
