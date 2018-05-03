import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';


@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  image: string;
  pictureOpts: object;

  constructor( private cameraP: CameraPreview, public navCtrl: NavController, public navParams: NavParams,
               public plat: Platform) {
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

  ionViewLoad() {
    this.cameraP.show();
  }

  public takePicture(){
    this.cameraP.takePicture(this.pictureOpts).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.image = 'assets/img/test.jpg';
    });
  }

  public submit(): void {
    this.cameraP.hide();
    this.navCtrl.push('SubmitPage', {"image": this.image});
  }

  public back(): void {
    this.navCtrl.pop();
  }
}
