import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from "@ionic-native/google-maps";

import { SQLite } from "@ionic-native/sqlite";

import { CameraPreview } from "@ionic-native/camera-preview"

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { AuthenticateProvider } from '../providers/authenticate/authenticate';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from "@ionic-native/camera";
import { SpottingsProvider } from '../providers/spottings/spottings';
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticateProvider,
    Camera,
    SpottingsProvider,
    Geolocation,
    GoogleMaps,
    SQLite,
    CameraPreview,
    DatabaseProvider
  ]
})
export class AppModule {}
