import {DateTime} from "ionic-angular";
export class PrayerRequest {

  public id: string;
  public title: string;
  public details: string;
  public priority: number;
  public personId: string;
  public isPublic: boolean;
  public isDeleted: boolean;
  public isAnswered: boolean;
  public createdOn: DateTime;

  constructor() {

  }

  init(array) {
    this.id = array['id'];
    this.title = array['title'];
    this.details = array['details'];
    this.priority = array['priority'];
    this.personId = array['personId'];
    this.isPublic = array['isPublic'];
    this.isDeleted = array['isDeleted'];
    this.isAnswered = array['isAnswered'];
    this.createdOn = array['createdOn']['date'];
  }

}
