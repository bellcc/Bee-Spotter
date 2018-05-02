import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, LatLng} from '@ionic-native/google-maps';

import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  map: GoogleMap;
  spotting: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
              private geolocation: Geolocation, private toastCtrl: ToastController) {
    platform.ready()
      .then(() => {
        geolocation.getCurrentPosition().then(pos => {
          console.log(pos.coords.latitude);
          console.log(pos.coords.longitude);
        })
    });
  }

  ionViewDidLoad() {
    this.loadMap();
    this.presentToast("Zoom in on the location of the bee spotting. Add a marker to the map. Drag marker to correct location.");
  }

  private loadMap(): void {
    this.map = GoogleMaps.create('map_canvas');

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
    this.presentToast(pos.target.lat + ", " + pos.target.lng);
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

  public back(): void {}

  public next(): void {}
}
