import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseProvider } from '../../providers/database/database';
@IonicPage()
@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
})
export class SubmitPage {
  spotting: object;
  title: string;
  date_spotted: string;
  public active_img: Array<Object>;

  chosenList : any;
  numbers : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation : Geolocation,
              private sqlService:DatabaseProvider) {
    this.spotting = {
      "image": this.navParams.get("image"),
      "title": this.navParams.get("title"),
      "date_spotted": this.navParams.get("date_spotted"),
      "latitude": this.navParams.get("latitude"),
      "longitude": this.navParams.get("longitude"),
      "amateur_species_name": this.navParams.get("amateur_species_name"),
      "auth_token": this.navParams.get("auth_token")
    };
    this.active_img = [];
    this.chosenList = [];
    this.getImages();
  }

  public next(): void {
    this.spotting["title"] = this.title;
    this.spotting["date_spotted"] = this.date_spotted;
    for(var i = 0; i<this.chosenList.length; i++){
      if(this.chosenList[this.chosenList[i].id].chosen)
      console.log(this.chosenList[i].id);
    }
    this.navCtrl.push('LocationPage', this.spotting);
  }

  getImages(){
    this.sqlService.GetImages().then((result) => {
      this.active_img = <Array<Object>> result;
      for(var i = 0; i < this.active_img.length; i++){
        this.chosenList.push({
          id: this.active_img[i].time,
          value : false
        })
      }

    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  public back(): void {
    this.navCtrl.pop();
  }
}
