import {DateTime} from "ionic-angular";
export class AuthToken {

  public token: string;
  public expiration: DateTime;
  public personId: string;

  constructor(array) {
    this.token = array['token'];
    this.expiration = array['expiration']['date'];
    this.personId = array['personId'];
  }
}
