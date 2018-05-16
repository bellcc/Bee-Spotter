import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';


@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  image: string[];
  pictureOpts: object;
  auth_token: string;
  user_id: string;

  constructor( private cameraP: CameraPreview, public navCtrl: NavController, public navParams: NavParams,
               public plat: Platform) {
    this.auth_token = this.navParams.get("auth_token");
    this.user_id = this.navParams.get("user_id");

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
    this.cameraP.show();
  }

  public takePicture(){
    this.cameraP.takePicture(this.pictureOpts).then((imageData) => {
      this.image.push('data:image/jpeg;base64,' + imageData)
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
    this.navCtrl.push('ProfilePage', {"auth_token": this.auth_token, "user_id": this.user_id});
  }
}
