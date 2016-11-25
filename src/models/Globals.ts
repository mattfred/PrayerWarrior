import {LoginRequest} from "./LoginRequest";
/**
 * Created by matthewfrederick on 11/25/16.
 */

export class Globals {

  public static getAuthToken() {
    console.log(localStorage.getItem("auth_token"));
    return localStorage.getItem("auth_token");
  }

  public static setAuthToken(authTokenId) {
    localStorage.setItem("auth_token", authTokenId);
  }

  public static setUsername(username) {
    localStorage.setItem("username", username);
  }

  public static getUsername() {
    return localStorage.getItem("username");
  }

  public static setPassword(password) {
    localStorage.setItem("password", password);
  }

  public static getPassword() {
    return localStorage.getItem("password");
  }

  public static setLoginRequest(loginRequest: LoginRequest) {
    this.setUsername(loginRequest.username);
    this.setPassword(loginRequest.password);
  }

  public static getLoginRequest() {
    if (this.getUsername() != null) {
      let loginRequest = new LoginRequest(this.getUsername(), this.getPassword());
      return loginRequest;
    }
    return null;
  }
}
