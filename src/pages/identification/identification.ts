import { Slides } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the IdentificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identification',
  templateUrl: 'identification.html',
})
export class IdentificationPage {

  @ViewChild(Slides) slides: Slides;

  constructor() {

  }

  ngAfterViewInit() {
    // this.slides.freeMode = true;
  }

  public slideChanged():void {
    // Do something if user swipes
  }

  public getBeeVariation():number {
    return this.slides.getActiveIndex();
  }
}
