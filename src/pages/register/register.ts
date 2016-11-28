import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Person} from "../../models/Person";
import {Http} from '@angular/http';
import {AuthToken} from "../../models/AuthToken";
import {LoginPage} from '../login/login'
import {TabsPage} from '../tabs/tabs'
import {Globals} from "../../models/Globals";
import {LoginRequest} from "../../models/LoginRequest";

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private first: string;
  private last: string;
  private email: string;
  private username: string;
  private password: string;
  private http: Http;
  private loader: any;


  constructor(public navCtrl: NavController, http: Http, public loadingCtrl: LoadingController) {
    this.http = http;
    this.loader = this.loadingCtrl.create();
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
  }

  presentLoading() {
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismissAll();
  }

  register() {
    console.log('Register new User: ' + this.username + " " + this.password);
    if (this.username && this.password && this.first && this.last && this.email) {
      this.presentLoading();
      let person = new Person(this.first, this.last, this.email, this.username, this.password);
      this.http.post("http://mattfred.com/register", person).subscribe((response) => {
        let authToken = new AuthToken(response.json());

        Globals.setAuthToken(authToken);
        Globals.setLoginRequest(new LoginRequest(person.username, person.password));
        console.log(authToken);
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsPage);
      });
    }
  }

}
