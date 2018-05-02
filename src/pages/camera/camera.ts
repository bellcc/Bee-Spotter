import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
	
	image: string;
	private db: SQLiteObject;
	
  constructor( private cameraP: CameraPreview, public navCtrl: NavController, private storage : Storage, public navParams: NavParams, plat : Platform, public sqlite: SQLite) {
		
		
		plat.registerBackButtonAction(()=>{
			cameraP.stopCamera();
			navCtrl.pop();
		});
		
		
		
		let options = {
				x: 0,
				y: 0,
				width: window.screen.width,
				height: window.screen.height,
				camera: cameraP.CAMERA_DIRECTION.BACK,
				toBack: true,
				tapFocus: false,
				previewDrag: false
			};
			
			
			
			cameraP.startCamera(options);
			this.connectToDb();
		}
			
	private connectToDb():void {
    
		this.sqlite.create({
			name: 'appDB.db',
			location: 'default'
		})
         .then((db: SQLiteObject) => {

             this.db = db;
             var sql = 'create table IF NOT EXISTS `images` (time INTEGER , imgData VARCHAR, spottingId VARCHAR)';
            
             this.db.executeSql(sql, {})
             .catch(e => console.log(e));
         })
         .catch(e => console.log(e));
     
		}	
		

	async takePicture(){
		try{
		 const pictureOpts: CameraPreviewPictureOptions = {
				width: 1280,
				height: 1280,
				quality: 85,
								}
		this.image = 'data:image/jpeg;base64,' + await this.cameraP.takePicture(pictureOpts);
	
		let time = (new Date).getTime();
		this.addPicture(time);
		}catch(e){
		 console.log(e);
	 }
	
  }
  
   addPicture(time){
      
     var sql = "INSERT INTO `images` (time, imgData, spottingId) VALUES ('"+time+"','"+this.image+"',null)";
    
     this.db.executeSql(sql,{})
     .then(() => console.log("ok"))
     .catch(e => console.log(e));
 
      
 }
   
   
  
  goToSubmit(){
	  this.cameraP.stopCamera();
	  this.db.close();
	  this.navCtrl.push('ImagesPage');
	  
	  
  }

}
