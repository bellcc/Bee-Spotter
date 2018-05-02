import { Slides } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-identification',
  templateUrl: 'identification.html',
})
export class IdentificationPage {

  @ViewChild(Slides) slides: Slides;
  current_species: string;

  species: string[] = [
    "Affinis",
    "Affinis",
    "Affinis",
    "Affinis",
    "Affinis",
    "Auriocomus",
    "Auriocomus",
    "Auriocomus",
    "Bimaculatus",
    "Citrinus",
    "Citrinus",
    "Citrinus",
    "Fervidus",
    "Fraternus",
    "Griseocollis",
    "Griseocollis",
    "Griseocollis",
    "Griseocollis",
    "Impatiens",
    "Pensylvanicus",
    "Pensylvanicus",
    "Perplexus",
    "Rufocinctus",
    "Vagans",
    "Vagans",
    "Variabilis",
    "Variabilis",
    "Variabilis"
  ];

  files: string[] = [
    "affinis1",
    "affinis5",
    "affinis4",
    "affinis3",
    "affinis2",
    "auricomus3",
    "auricomus1",
    "auricomus2",
    "bimaculatus",
    "citrinus3",
    "citrinus1",
    "citrinus2",
    "fervidus",
    "fraternus",
    "griseocollis1",
    "griseocollis4",
    "griseocollis3",
    "griseocollis2",
    "impatiens",
    "pensylvanicus1",
    "pensylvanicus2",
    "apis_mellifera",
    "apis_mellifera",
    "vagans1",
    "vagans2",
    "variabilis2",
    "variabilis1",
    "variabilis3"
  ];

  constructor() {
    this.current_species = "Affinis";
  }

  ngAfterViewInit() { }

  public slideChanged():void {
    this.current_species = this.species[this.slides.getActiveIndex()];
  }

  public getSelected():string {
    return this.files[this.slides.getActiveIndex()];
  }

  public prev(): void {

  }

  public next(): void {

  }
}
