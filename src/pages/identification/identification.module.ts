import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentificationPage } from './identification';

@NgModule({
  declarations: [
    IdentificationPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentificationPage),
  ],
})
export class IdentificationPageModule {}
