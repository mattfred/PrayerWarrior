import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Globals} from "../../models/Globals";

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page');
  }

  logout() {
    Globals.setAuthToken("");
    let loginRequest = Globals.getLoginRequest();
    loginRequest.password = "";
    Globals.setLoginRequest(loginRequest);
    this.navCtrl.pop();
  }

}
