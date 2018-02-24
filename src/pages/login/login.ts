import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticateProvider } from "../../providers/authenticate/authenticate"

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  todo = { };

  constructor(public navCtrl: NavController, public navParams: NavParams, public myService: AuthenticateProvider) { }

  logForm() {
    this.myService.login(this.todo["username"], this.todo["password"]).subscribe(allowed => {
      if (allowed) {

      } else {

      }
    },
      error => {

      }
    );
  }
}
