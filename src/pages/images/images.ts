import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {
  private db: SQLiteObject;
  images = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite :SQLite) {
    this.connectToDb();
    this.getImages();

  }

  private getImages(){
    var sql = "SELECT * FROM images where spottingId IS NULL";

    /*
    this.db.executeSql(sql,{})
      .then(results => {
        for(var i = 0; i< results.rows.length; i++){

          this.images.push({
            time : results.rows.item(i).time,
            imgData: results.rows.item(i).imgData,
          });


        }
      })
      .catch(e => console.log(e));
      */
  }

  private goToSpotting(){


    this.navCtrl.push('SubmitPage');
  }


  private connectToDb():void {

    this.sqlite.create({
      name: 'appDB.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        this.db = db;
        var sql = 'create table IF NOT EXISTS `images` (time INTEGER , imgData VARCHAR, spottingId VARCHAR)';

        this.db.executeSql(sql, {})
          .catch(e => JSON.stringify(e));
      })
      .catch(e =>  JSON.stringify(e));

  }


  ionViewDidLoad() { }

  public goToSubmit(): void { }
}
