///<reference path="../../../node_modules/@ionic-native/sqlite/index.d.ts"/>

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DatabaseProvider {


  constructor( private sqlite : SQLite) {

    }




  // private connectToDb():Promise<void>{
  //
  //   this.sqlite.create({
  //     name: 'appDB.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //
  //       var sql = 'create table IF NOT EXISTS `images` (time INTEGER , imgData VARCHAR, spottingId VARCHAR)';
  //       db.executeSql(sql,{}).then(()=>
  //       {console.log("Image table created");});
  //
  //      this.db = db;
  //
  //     })
  //     .catch(e =>  console.log(JSON.stringify(e)));
  //   return Promise.resolve();
  // }

  public dropTable(){
    this.sqlite.create({
      name: 'appDB.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
          db.executeSql("drop table if exists 'images'" ,{});
      });


  }

  public InsertImage(imageData){


    this.sqlite.create({
      name: 'appDB.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        let sql = 'create table IF NOT EXISTS `images` (time INTEGER primary key, imgData VARCHAR, spottingId VARCHAR)';
        db.executeSql(sql, {}).then(() => {
          let sqlInsert = "INSERT INTO `images` (time, imgData, spottingId) VALUES ('" + (new Date).getTime()+ "','" + imageData + "',null)";
          db.executeSql(sqlInsert, {}).then(() => {
            console.log("data inserted");

          });
        }).catch(e => console.log(JSON.stringify(e)));
      });

  }

  public GetImages():Promise<any>{
   return this.sqlite.create({
      name: 'appDB.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return new Promise((resolve, reject) => {
         let sql = "Select imgData, time from images"
          db.executeSql(sql, []).then((data) => {
            let images = [];
            console.log("results.length " + data.rows.length);
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                images.push({
                  imgData: data.rows.item(i).imgData,
                  time: data.rows.item(i).time
                });
              }
            }
            resolve(images);
          }, (error) => {
            reject(error);
          });
        });
      });
  }

  public UpdateImage(SId, time){
    this.sqlite.create({
      name: 'appDB.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        let sql = 'create table IF NOT EXISTS `images` (time INTEGER , imgData VARCHAR, spottingId VARCHAR)';
        db.executeSql(sql,{}).then(()=>
        {
          let sqlSelect: string;
          console.log("Image table created");
          sqlSelect = "Update images set spottingID = '" + SId + "'where time = '" + time + "'";
          db.executeSql(sqlSelect,{}).then(() =>{console.log("tableUpdated")


          })
        })

      })


  }

  public InsertSpotting(spotting){
    this.sqlite.create({
      name: 'appDB.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
       /* this.spotting = {
          "image": this.navParams.get("image"),
          "title": this.navParams.get("title"),
          "date_spotted": this.navParams.get("date_spotted"),
          "latitude": this.navParams.get("latitude"),
          "longitude": this.navParams.get("longitude"),
          "amateur_species_name": this.navParams.get("amateur_species_name"),
          "auth_token": this.navParams.get("auth_token")
        };*/

        let sql = 'create table IF NOT EXISTS `spottings` (spottingID integer primary key autoincrement, title string,  time Integer, longitude varchar, latitude varchar, species varchar)';
        db.executeSql(sql,{}).then(()=>
        {
          let sqlSelect: string;
          let title = spotting.title;
          let time  = spotting.date_spotted;
          let lat = spotting.latitude;
          let long = spotting.longitude;
          let species = spotting.amateur_species_name;
          sqlSelect = "insert into spottings values(null,'"+title+"','"+time+"','"+lat+"','"+long+"','"+species+"')";
          db.executeSql(sqlSelect,{}).then(() =>{
            console.log("spottingInserted");
          }).catch( e => console.log(JSON.stringify(e)));
        }).catch( e => console.log(e));

      })




  }

}
