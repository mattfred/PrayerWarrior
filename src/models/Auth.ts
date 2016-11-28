import {Http} from "@angular/http";
import {Globals} from "./Globals";
import {LoginRequest} from "./LoginRequest";
import {AuthToken} from "./AuthToken";
export class Auth {

  private http: Http;
  private username: string;
  private password: string;

  constructor(http: Http) {
    this.http = http;
  }

  public login() {
    if (Globals.getLoginRequest() != null) {
      console.log("login creds found! :");
      let loginRequest = Globals.getLoginRequest();
      this.username = loginRequest.username;
      console.log("username: " + loginRequest.username);
      this.password = loginRequest.password;
      console.log("password: " + loginRequest.password);
      if (this.username && this.password) {
        let loginRequest = new LoginRequest(this.username, this.password);
        console.log("do login");
        this.http.post("http://mattfred.com/login", loginRequest).subscribe((response) => {
          let authToken = new AuthToken(response.json());
          Globals.setAuthToken(authToken.token);
          Globals.setLoginRequest(loginRequest);
          console.log("login success");
          return true;
        }, (error) => {
          return false;
        });
      }
    }
  }
}
