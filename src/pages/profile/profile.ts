import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user"

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  token: string;
  name: string;
  user_id: string;
  spottings: object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: UserProvider) {
    this.name = "User";
    this.token = this.navParams.get("auth_token");
    this.user_id = this.navParams.get("user_id");

    this.service.get_user_info(this.token, this.user_id).subscribe(data => {
        // this.name = data["user_info"]["username"];
      },
      error => {
        console.log(error);
      }
    );

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
