import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginRequest} from "../models/LoginRequest";

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {

  private http: Http;
  private BASE_URL = "http://mattfred.com/PrayerWarrior/public";

  constructor(public http: Http) {
    this.http = http;
  }

  public login(loginRequest: LoginRequest) {
    this.http.post(this.BASE_URL + '/login', loginRequest).subscribe((response) => {
      return response;
    })
  }

}
