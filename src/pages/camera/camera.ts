import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  images: string[];
  image:  string;
  pictureOpts: object;
  auth_token: string;

  constructor( private cameraP: CameraPreview, public navCtrl: NavController, public navParams: NavParams,
               public plat: Platform, private sql :DatabaseProvider) {
    this.auth_token = this.navParams.get("auth_token")
    this.images = [];
    this.image = "";
    this.pictureOpts = {
      width: 1280,
      height: 1280,
      quality: 85
    };

    plat.registerBackButtonAction(() => {
      cameraP.stopCamera();
      navCtrl.pop();
    });

    let options = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height - 150,
      camera: 'rear',
      tapPhoto: false,
      previewDrag: false,
      toBack: true,
      alpha: 1
    };

    cameraP.startCamera(options);
  }

  ionViewDidLoad() {
    console.log("hello ugh");
    this.cameraP.show();
  }

  public takePicture(){
    this.cameraP.takePicture(this.pictureOpts).then((imageData) => {
      this.images.push('data:image/jpeg;base64,' + imageData);
      this.image = this.images[this.images.length-1];

      this.sql.InsertImage(this.image);

    }, (err) => {
      console.log(err);
      // this.image = 'assets/img/test.jpg';
    });
  }

  public submit(): void {
    this.cameraP.hide();
    this.navCtrl.push('SubmitPage', {"images": this.image, "auth_token": this.auth_token});
  }

  public back(): void {
    this.navCtrl.push('ProfilePage', {"auth_token": this.auth_token});
  }
}
