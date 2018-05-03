import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
})
export class SubmitPage {
  spotting: object;
  title: string;
  date_spotted: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation : Geolocation) {
    this.spotting = {
      "image": this.navParams.get("image"),
      "title": this.navParams.get("title"),
      "date_spotted": this.navParams.get("date_spotted"),
      "latitude": this.navParams.get("latitude"),
      "longitude": this.navParams.get("longitude"),
      "amateur_species_name": this.navParams.get("amateur_species_name")
    };
  }

  public next(): void {
    this.spotting["title"] = this.title;
    this.spotting["date_spotted"] = this.date_spotted;

    this.navCtrl.push('LocationPage', this.spotting);
  }

  public back(): void {
    this.navCtrl.pop();
  }
}
