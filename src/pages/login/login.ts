import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthenticateProvider } from "../../providers/authenticate/authenticate"
import {SpottingsProvider} from "../../providers/spottings/spottings";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  todo = { };
  invalid : boolean;

  constructor(public myService: AuthenticateProvider, public tmpService: SpottingsProvider, public storage: Storage, public nav: NavController) {
    this.invalid = false;

    // this.nav.push('LocationPage');
    // this.nav.push('ProfilePage');
    this.nav.push('IdentificationPage');

    /*
    storage.get('auth_token').then((token) => {
      if (token) {
        // this.nav.push('ProfilePage');
        // this.nav.push('IdentificationPage');
        this.nav.push('LocationPage');
      } else {
        console.log("Token not found");
      }
    });
    */
  }

  logForm() {
    this.myService.login(this.todo["username"], this.todo["password"]).subscribe(allowed => {
      if (allowed) {
        console.log("AUTH SUCCESS");
      } else {
        console.log("AUTH FAILURE");
        this.invalid = true;
      }
    },
      error => {
        console.log("AUTH ERROR");
      }
    );
  }
}
