export class AuthToken {

  public token: string;
  public expiration: string;
  public personId: string;

  constructor(token: string, expiration: string, personId: string) {
    this.token = token;
    this.expiration = expiration;
    this.personId = personId;
  }
}
