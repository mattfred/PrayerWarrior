import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {LoginRequest} from '../../models/LoginRequest';
import {AuthToken} from "../../models/AuthToken";
import {RegisterPage} from '../register/register';
import {TabsPage} from '../tabs/tabs'
import {Globals} from "../../models/Globals";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  private username: string;
  private password: string;
  private http: Http;


  constructor(public navCtrl: NavController, http: Http) {
    this.http = http;

    console.log("Check to see if login creds are saved");
    // no to show login screen
    if (Globals.getLoginRequest() != null) {
      console.log("login creds found!");
      let loginRequest = Globals.getLoginRequest();
      this.username = loginRequest.username;
      this.password = loginRequest.password;
      this.login();
    }
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
    this.navCtrl.push(RegisterPage);
  }

  login() {
    console.log('Login click: ' + this.username + " " + this.password);
    if (this.username && this.password) {
      let loginRequest = new LoginRequest(this.username, this.password);
      this.http.post("http://mattfred.com/login", loginRequest).subscribe((response) => {
        let authToken = new AuthToken(response.json());
        Globals.setAuthToken(authToken.token);
        Globals.setLoginRequest(loginRequest);
        console.log(authToken);
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsPage);
      });
    }
  }
}
