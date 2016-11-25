import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {LoginRequest} from '../../models/LoginRequest';
import {AuthToken} from "../../models/AuthToken";
import {RegisterPage} from '../register/register';
import {TabsPage} from '../tabs/tabs'


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
        console.log(authToken);
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsPage);
      });
    }
  }
}
