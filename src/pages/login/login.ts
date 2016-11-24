import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {LoginRequest} from '../../models/LoginRequest';
import {AuthToken} from '../../models/AuthToken';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  private username: string;
  private password: string;
  public http: Http;
  public authToken = AuthToken;

  constructor(public navCtrl: NavController, httpService: Http) {
    this.http = httpService;
  }

  login() {
    console.log('Login click: ' + this.username + " " + this.password);
    if (this.username && this.password) {
      console.log('logging in user');
      let loginRequest = new LoginRequest(this.username, this.password);

      this.http.post('http://localhost:8181/PrayerWarriorAPI/public/login', loginRequest).subscribe((response) => {
        this.authToken = response.json().results;
      });
    }
  }
}
