import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
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
  private loader: any;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create();
    console.log("Check to see if login creds are saved");
    // no to show login screen
    if (Globals.getLoginRequest()) {
      console.log("login creds found! :");
      let loginRequest = Globals.getLoginRequest();
      this.username = loginRequest.username;
      console.log("username: " + loginRequest.username);
      this.password = loginRequest.password;
      this.login();
    }
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
    this.navCtrl.push(RegisterPage);
  }

  login() {
    if (this.username && this.password) {
      this.presentLoading();
      let loginRequest = new LoginRequest(this.username, this.password);
      this.http.post("http://mattfred.com/login", loginRequest).subscribe((response) => {
        let authToken = new AuthToken(response.json());
        Globals.setAuthToken(authToken.token);
        Globals.setLoginRequest(loginRequest);
        console.log(authToken);
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsPage);
      }, (error) => {
        this.showAlert(error.status);
      });
    }
  }

  presentLoading() {
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismissAll();
  }

  showAlert(statusCode) {
    this.hideLoading();
    var title = "";
    var message = "";
    switch (statusCode) {
      case 401:
        title = "Wrong Password";
        message = "Password incorrect. Please try again";
        break;
      case 404:
        title = "Login Error";
        message = "Username not found. Please try again or register";
        break;
      case 500:
        title = "Error";
        message = "An error has occurred. Please try again later.";
        break;
    }
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
