import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Spotting {
  title: string;
  date: Date;
  latitude: number;
  longitude: number;
  amateur_species_name: string;

  constructor(title: string, date: Date, latitude: number, longitude: number, amateur_species_name: string) {
    this.title = title;
    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.amateur_species_name = amateur_species_name;
  }
}

export class Photo {
  id: string;
  encoded_photo: string;

  constructor(id: string, encoded_photo: string) {
    this.id = id;
    this.encoded_photo = encoded_photo;
  }
}

@Injectable()
export class SpottingsProvider {

  constructor(public http: Http) {
    console.log('Hello SpottingsProvider Provider');
  }

  public add_photo(photo: Photo) {
    return Observable.create(observer => {
      let headers = {'content-type': "application/x-www-form-urlencoded"};

      let payload = new FormData();
      payload.append('spotting_id', photo.id);
      payload.append('photo', photo.encoded_photo);

      this.http.put("/api/v1/spottings", payload, headers)
        .map(res => res.json())
        .subscribe( data => {
          // Perform some simple logic to determine if good

            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(false);
            observer.complete();
          }
        );
    });
  }

  public create_spotting(spotting: Spotting) {
    return Observable.create(observer => {
      let headers = {'content-type': "application/x-www-form-urlencoded"};

      let payload = new FormData();
      payload.append('title', spotting.title);
      payload.append('date_spotted', spotting.date.toUTCString());
      payload.append('latitude', spotting.latitude.toString());
      payload.append('longitude', spotting.longitude.toString());
      payload.append('amateur_species_name', spotting.amateur_species_name);

      this.http.post("/api/v1/spottings", payload, headers)
        .map(res => res.json())
        .subscribe( data => {
          // Perform some simple logic to determine if good

            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(false);
            observer.complete();
          }
        );
    });
  }
}
