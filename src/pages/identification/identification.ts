import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-identification',
  templateUrl: 'identification.html',
})
export class IdentificationPage {

  current_species: string;
  active_img: any;

  species: object = {
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

  constructor() {
    this.current_species = "Affinis";
    this.active_img = this.species["Affinis"];
  }

  ngAfterViewInit() { }

  public onSelectChange(): void {
    this.active_img = this.species[this.current_species];

  }

  public getSelected(): string {
    return this.current_species;
  }

  public back(): void {
    // this.nav.push();
  }

  public continue(): void {

  }
}
