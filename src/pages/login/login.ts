import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {LoginRequest} from '../../models/LoginRequest';
import {AuthToken} from '../../models/AuthToken';
import {ApiService} from "../../providers/api-service";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  private username: string;
  private password: string;
  public apiService: ApiService;
  public authToken = AuthToken;

  constructor(public navCtrl: NavController, apiService: ApiService) {
    this.apiService = apiService;
  }

  login() {
    console.log('Login click: ' + this.username + " " + this.password);
    if (this.username && this.password) {
      console.log('logging in user');
      let loginRequest = new LoginRequest(this.username, this.password);
      let response = this.apiService.login(loginRequest);
      switch (response.status) {
        case 200: // login success
          console.log("login success");
          this.authToken = response.json().result;
          break;
        case 401: // wrong password
          console.log("wrong password");
          break;
        case 500: // username not found
          console.log("username not found");
          break;
      }
    }
  }
}
