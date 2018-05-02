import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
})
export class SubmitPage {
  images: string[];
  title : "";
  spotting : {};
  image: string;
  Coords = "";

  private db : SQLiteObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage,
              private geolocation : Geolocation, public  sqlite : SQLite) {


    // this.image = this.images[0];
    this.connectToDb();
  }

  private connectToDb():void {

    this.sqlite.create({
      name: 'appDB.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        this.db = db;
        var sql = 'create table IF NOT EXISTS `spottings` (spottingId, time, imgData, location, species )';

        this.db.executeSql(sql, {})
          .catch(e =>  JSON.stringify(e));
      })
      .catch(e => JSON.stringify(e));

  }

  fillInTheCoords(){
    this.navCtrl.push('MapsPage');
  }

  goToIdentifier(){
    this.navCtrl.push('IdentifyPage');
  }

  getCurrentLoc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.spotting['lat'] = resp.coords.latitude;
      this.spotting['long'] = resp.coords.longitude;
      this.Coords = this.spotting['lat'] + " , " +  this.spotting['long'];
    }).catch((error)=>{
      console.log("error getting location" , error);
    });
  }

  saveDraft(){
    let title = this.storage.get(this.title);
    let time = 0;
    let species = this.storage.get('species');
    let location = this.Coords;

    let sql = "INSERT INTO `spottings` (spottingId, time, imgData, location, species) VALUES ('"+time+"','"+this.image+"',null)";

    this.db.executeSql(sql,{})
      .then(() =>console.log("ok") )
      .catch(e => console.log(e));
  }

  submitSpotting(){
    this.spotting['title'] = this.title;
    this.spotting['images'] = this.images;
  }

}
