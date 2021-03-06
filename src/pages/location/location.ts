import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';

import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  map: GoogleMap;
  spotting: object;

  constructor(public navCtrl: NavController, public params: NavParams, public platform: Platform,
              public geolocation: Geolocation, private toastCtrl: ToastController) {
    platform.ready()
      .then(() => {
        geolocation.getCurrentPosition().then(pos => {
          this.spotting["latitude"] = pos.coords.latitude;
          this.spotting["longitude"] = pos.coords.longitude;

          console.log("Done");

          this.loadMap(pos.coords.latitude, pos.coords.longitude);
        })
    });

    this.spotting = {
      "title": this.params.data["title"],
      "date_spotted": this.params.data["date_spotted"],
      "latitude": this.params.data["latitude"],
      "longitude": this.params.data["longitude"],
      "amateur_species_name": this.params.data["amateur_species_name"],
      "image": this.params.data["image"],
      "auth_token": this.params.get("auth_token")
    };
  }

  ionViewDidLoad() {
    this.presentToast("Zoom in on the location of the bee spotting. Add a marker to the map. Drag marker to correct location.");
  }

  private loadMap(latitude: number, longitude: number): void {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {});
  }

  private createMarker(latitude: number, longitude: number) {
    this.map.addMarker({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      draggable: true,
      position: {
        lat: latitude,
        lng: longitude
      }
    }).then(marker => {
      marker.on(GoogleMapsEvent.MARKER_DRAG_END)
        .subscribe(() => {
          this.spotting = {
            "lat": marker.getPosition().lat,
            "lng": marker.getPosition().lng
          }
        })
    });
  }

  public markLocation(): void {
    let pos = this.map.getCameraPosition();
    this.createMarker(pos.target.lat, pos.target.lng);

    this.spotting["latitude"] = pos.target.lat;
    this.spotting["longitude"] = pos.target.lng;
  }

  public getSpottingLocation(): object {
    return this.spotting;
  }

  private presentToast(message): void {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      closeButtonText: 'Close',
      showCloseButton: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  public back(): void {
    this.navCtrl.pop();
  }

  public next(): void {
    this.navCtrl.push('IdentificationPage', this.spotting);
  }
}
