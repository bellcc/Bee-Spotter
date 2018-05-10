import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import {SpottingsProvider} from "../../providers/spottings/spottings";

import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-identification',
  templateUrl: 'identification.html',
})
export class IdentificationPage {

  current_species: string;
  active_img: any;
  token: string;
  spotting; object;

  species: object = {
    "Select a Species": [],
    "Affinis": [
      "assets/imgs/species/affinis1.jpg",
      "assets/imgs/species/affinis5.jpg",
      "assets/imgs/species/affinis4.jpg",
      "assets/imgs/species/affinis3.jpg",
      "assets/imgs/species/affinis2.jpg"
    ],
    "Auriocomus": [
      "assets/imgs/species/auricomus3.jpg",
      "assets/imgs/species/auricomus1.jpg",
      "assets/imgs/species/auricomus2.jpg"
    ],
    "Bimaculatus": [
      "assets/imgs/species/bimaculatus.jpg"
    ],
    "Citrinus": [
      "assets/imgs/species/citrinus3.jpg",
      "assets/imgs/species/citrinus1.jpg",
      "assets/imgs/species/citrinus2.jpg"
    ],
    "Fervidus": [
      "assets/imgs/species/fervidus.jpg"
    ],
    "Fraternus": [
      "assets/imgs/species/fraternus.jpg"
    ],
    "Griseocollis": [
      "assets/imgs/species/griseocollis1.jpg",
      "assets/imgs/species/griseocollis4.jpg",
      "assets/imgs/species/griseocollis3.jpg",
      "assets/imgs/species/griseocollis2.jpg"
    ],
    "Impatiens": [
      "assets/imgs/species/impatiens.jpg"
    ],
    "Pensylvanicus": [
      "assets/imgs/species/pensylvanicus1.jpg",
      "assets/imgs/species/pensylvanicus2.jpg"
    ],
    "Perplexus": [
      "assets/imgs/species/apis_mellifera.png"
    ],
    "Rufocinctus": [
      "assets/imgs/species/apis_mellifera.png"
    ],
    "Vagans": [
      "assets/imgs/species/vagans1.jpg",
      "assets/imgs/species/vagans2.jpg"
    ],
    "Variabilis": [
      "assets/imgs/species/variabilis2.jpg",
      "assets/imgs/species/variabilis1.jpg",
      "assets/imgs/species/variabilis3.jpg"
    ]
  };

  constructor(private alertCtrl: AlertController, public nav: NavController, public params: NavParams,
              public myService: SpottingsProvider, public storage: Storage) {
    this.current_species = "Select a Species";
    this.active_img = this.species["Select a Species"];

    this.spotting = {
      "title": this.params.data["title"],
      "date_spotted": this.params.data["date_spotted"],
      "latitude": this.params.data["latitude"],
      "longitude": this.params.data["longitude"],
      "amateur_species_name": this.params.data["amateur_species_name"],
      "image": this.params.data["image"]
    };

    this.token = this.params.get("auth_token");

    this.spotting.amateur_species_name = this.current_species;
  }

  ngAfterViewInit() { }

  public onSelectChange(): void {
    this.active_img = this.species[this.current_species];
    this.spotting.amateur_species_name = this.current_species;
  }

  public back(): void {
    // this.nav.push();
  }

  public submit(): void {
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Spotting Confirmation',
      message: 'Are you sure you want to submit this spotting now?',
      buttons: [
        {
          text: 'Save as Draft',
          handler: () => {
            // Store in database
            this.nav.push('CameraPage');
          }
        },
        {
          text: 'Submit',
          handler: () => {
            this.myService.create_spotting(this.spotting["title"], new Date(this.spotting["date_spotted"]).getTime(),
              this.spotting["latitude"], this.spotting["longitude"], this.spotting["amateur_species_name"],
              this.token).subscribe(data => {
                console.log(data);
            },
              error => {
                console.log("error");
            });
          }
        }
      ]
    });

    alert.present();
  }
}
