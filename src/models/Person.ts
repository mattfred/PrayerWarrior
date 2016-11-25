export class Person {

  public first: string;
  public last: string;
  public email: string;
  public username: string;
  public password: string;

  constructor(first: string, last: string, email: string, username: string, password: string) {
    this.first = first;
    this.last = last;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
