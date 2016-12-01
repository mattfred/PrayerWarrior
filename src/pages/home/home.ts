import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Globals} from "../../models/Globals";
import {Auth} from "../../models/Auth";
import {SettingsPage} from "../settings/settings";
import {LoginPage} from "../login/login";
import {DetailsPage} from "../details/details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private requests: any;
  private loader: any;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.requests = [];
    this.loader = this.loadingCtrl.create();
  }

  ionViewWillEnter() {
    this.presentLoading();
    if (!Globals.getAuthToken() && !Globals.getPassword()) { // no auth token or password
      this.goToLogin();
    } else if (!Globals.getAuthToken() && Globals.getPassword()) { // no auth token but password is present
      this.tryToLogin();
    } else {
      let authToken = Globals.getAuthToken();
      console.log("authToken: " + authToken);
      let header = new Headers({'Content-type': 'application/json'});
      header.append('Authorization', authToken);
      let options = new RequestOptions({headers: header});
      this.http.get("http://mattfred.com/requests", options).subscribe((response) => {
        console.log(response.json());
        this.requests = response.json();
        this.hideLoading();
      }, (error) => {
        console.log(error);
        switch (error.status) {
          case 401:
            this.tryToLogin();
            break;
        }
      });
    }
  }

  presentLoading() {
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismissAll();
  }

  tryToLogin() {
    let auth = new Auth(this.http);
    let success = auth.login();
    if (success) this.ionViewWillEnter();
    else {
      this.goToLogin();
      Globals.setPassword(null); // remove password so that it doesn't loop logging in
      this.hideLoading();
    }
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
    this.hideLoading();
  }

  settings() {
    this.navCtrl.push(SettingsPage);
    this.hideLoading();
  }

  itemSelected(request) {
    this.navCtrl.push(DetailsPage, {
      'prayerRequest': request
    });
  }
}
