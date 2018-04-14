import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthenticateProvider } from "../../providers/authenticate/authenticate"


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  todo = { };
  invalid : boolean;

  constructor(public myService: AuthenticateProvider, public storage: Storage, public nav: NavController) {
    this.invalid = false;

    storage.get('auth_token').then((token) => {
      if (token) {
        // this.nav.push(CameraPage);
        this.nav.push('ProfilePage');
        this.nav.push('');
      } else {
        console.log("Token not found");
      }
    });
  }

  logForm() {
    this.myService.login(this.todo["username"], this.todo["password"]).subscribe(allowed => {
      if (allowed) {
        console.log("AUTH SUCCESS");
        // this.nav.push(CameraPage);
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
