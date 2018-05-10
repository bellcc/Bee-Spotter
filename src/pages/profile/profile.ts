import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  token: string;
  spottings: object[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.token = this.navParams.get("auth_token");

    this.spottings = [
      {
        "title": "Hello World",
        "date": "03-01-2018",
        "location": "Times Square"
      },
      {
        "title": "Hello World",
        "date": "03-01-2018",
        "location": "Times Square"
      },
      {
        "title": "Hello World",
        "date": "03-01-2018",
        "location": "Times Square"
      },
      {
        "title": "Hello World",
        "date": "03-01-2018",
        "location": "Times Square"
      }
    ]
  }

  ionViewDidLoad() { }

  public back(): void {
    this.navCtrl.push('CameraPage', {"auth_token": this.token});
  }
}
