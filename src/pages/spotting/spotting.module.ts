import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpottingPage } from './spotting';

@NgModule({
  declarations: [
    SpottingPage,
  ],
  imports: [
    IonicPageModule.forChild(SpottingPage),
  ],
})
export class SpottingPageModule {}
