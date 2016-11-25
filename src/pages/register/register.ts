import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Person} from "../../models/Person";
import {Http} from '@angular/http';
import {AuthToken} from "../../models/AuthToken";
import {LoginPage} from '../login/login'
import {TabsPage} from '../tabs/tabs'

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

  constructor(public navCtrl: NavController, http: Http) {
    this.http = http;
  }

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
  }

  register() {
    console.log('Register new User: ' + this.username + " " + this.password);
    if (this.username && this.password && this.first && this.last && this.email) {
      let person = new Person(this.first, this.last, this.email, this.username, this.password);
      this.http.post("http://mattfred.com/register", person).subscribe((response) => {
        let authToken = new AuthToken(response.json());
        console.log(authToken);
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsPage);
      });
    }
  }

}
