import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthenticateProvider } from "../../providers/authenticate/authenticate"
import { SpottingsProvider } from "../../providers/spottings/spottings";
import { UserProvider } from "../../providers/user/user";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  todo = { };
  invalid : boolean;

  constructor(public myService: AuthenticateProvider, public tmpService: SpottingsProvider, public storage: Storage,
              public nav: NavController, public userService: UserProvider) {
    this.invalid = false;

    storage.get('auth_token').then((token) => {
      if (token) {
        this.nav.push('CameraPage', {"auth_token": token});
      } else {
        console.log("Token not found");
      }
    });
  }

  logForm() {
    this.myService.login(this.todo["username"], this.todo["password"]).subscribe(data => {
      if (data["auth_result"]) {
        this.nav.push('CameraPage', {"auth_token": data["auth_token"], "user_id": data["user_info"]["id"]});
      } else {
        this.invalid = true;
      }
    },
      error => {
        console.log("AUTH ERROR");
      }
    );
  }
}
