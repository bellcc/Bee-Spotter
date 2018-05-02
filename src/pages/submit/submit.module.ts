import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitPage } from './submit';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    SubmitPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitPage),
  ],
  exports: [
    SubmitPage,
  ],
  providers: [
    Geolocation,
    SubmitPage,
  ]
})
export class SubmitPageModule {}
