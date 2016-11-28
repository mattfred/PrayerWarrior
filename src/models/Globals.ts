import {LoginRequest} from "./LoginRequest";
/**
 * Created by matthewfrederick on 11/25/16.
 */

export class Globals {

  public static getAuthToken() {
    let token = localStorage.getItem("auth_token");
    if (token) return token;
    return null;
  }

  public static setAuthToken(authTokenId) {
    localStorage.setItem("auth_token", authTokenId);
  }

  public static setUsername(username) {
    localStorage.setItem("username", username);
  }

  public static getUsername() {
    let username = localStorage.getItem("username");
    if (username) return username;
    return null;
  }

  public static setPassword(password) {
    localStorage.setItem("password", password);
  }

  public static getPassword() {
    let password = localStorage.getItem("password");
    if (password) return password;
    console.log("password: " + password);
    return "";
  }

  public static setLoginRequest(loginRequest: LoginRequest) {
    this.setUsername(loginRequest.username);
    this.setPassword(loginRequest.password);
  }

  public static getLoginRequest() {
    if (this.getUsername() && this.getPassword()) {
      return new LoginRequest(this.getUsername(), this.getPassword());
    }
    return null;
  }
}
