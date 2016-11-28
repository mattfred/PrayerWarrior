import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import {NavController} from "ionic-angular";
import {NewRequestPage} from "../new-request/new-request";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = NewRequestPage;
  tab3Root: any = ContactPage;

  constructor(navCtrl: NavController) {

  }
}
