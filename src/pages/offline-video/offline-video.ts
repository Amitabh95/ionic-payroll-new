import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

// import { VideoPlayer } from '@ionic-native/video-player';

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

declare let cordova: any;
@IonicPage()
@Component({
  selector: 'page-offline-video',
  templateUrl: 'offline-video.html',
})
export class OfflineVideoPage {
  public player: any;
  public storageDirectory: string = '';
  public fileTransfer: FileTransferObject;
  public downloading: boolean ;
  public result: number;
  public videoLink: string;
  public options: StreamingVideoOptions;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private file: File,
    public platform: Platform,
    public alertCtrl: AlertController,
    private streamingMedia: StreamingMedia
  ) {
    

    this.platform.ready().then(() => {

        if(!this.platform.is('cordova')) {
          return false;
        }

        if (this.platform.is('ios')) {
          this.storageDirectory = cordova.file.applicationStorageDirectory;
        }

        else if(this.platform.is('android')) {
	    
            file.createDir(file.externalDataDirectory, 'Payroll', true).then((result)=>{
                console.log("Directory created"+result);
            });
        
            this.storageDirectory = cordova.file.externalDataDirectory + 'Payroll/';
            console.log(this.storageDirectory);
        }
        else {
            return false;
        }
    });
    
  }
  

  ionViewDidLoad() {
    
    // this.player = document.getElementById('video-placeholder');
    // this.player.type = "video/mp4";
    this.checkExistence();
    

  //  if(this.result === true){
  //   console.log('uppar-hai')
  //    // console.log(cordova.file.externalDataDirectory + 'Payroll/1.mp4');
      
  //   } else {
  //     console.log('uppar-nahi')
  //     this.downloading = false;
  //     this.player.src = "https://res.cloudinary.com/amitabh/video/upload/v1531732419/Paratroopers_Earning_the_Badge_-_Indian_Army_Motivational_-_Veer_by_Discovery.mp4" ;
  //   }
      this.options = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'portrait',
        shouldAutoClose: true,
        controls: true
      };
    }

  onPlayPause(){
    if (this.player.paused) 
      this.player.play(); 
    else 
      this.player.pause(); 
  }

  onKeepOffline(){
    if(this.result === 1){
      this.downloading = true; 
      console.log('hai')
      
    } else {
      this.downloading = false;
      console.log('nahi hai')
      this.download();
      
    }
  }
  
  
 

  download() {

    this.platform.ready().then(() => {
      /*file.checkDir(file.externalDataDirectory, 'newDir').then( => console.log('Directory exists')).catch(err =>
      console.log('Directory doesnt exist'));
      console.log('new Directory is created');
      */
	  });
    const fileTransfer: FileTransferObject = this.transfer.create();
    const imageLocation = "https://res.cloudinary.com/amitabh/video/upload/v1532037421/Breaking_Point_-_Indian_Air_Force_Academy_Promo_-_Veer_by_Discovery_-_Starts_June_4_9-00_PM.mp4";
    
    fileTransfer.download(imageLocation, this.storageDirectory + '1.mp4').then((entry) => {
        
    const alertSuccess = this.alertCtrl.create({
      title: `Download Succeeded!`,
      subTitle: `Successfully downloaded to: ${entry.toURL()}`,
      buttons: ['Ok']
      });

          alertSuccess.present();

    },
    (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `was not downloaded. Error code: ${error}`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });

    
}

checkExistence(): any {
  this.file.checkFile(cordova.file.externalDataDirectory + 'Payroll/' ,'1.mp4').then(
    (res) => res,
    (err) => false
).then(fileExists => {
    if (fileExists === true){
      this.result = 1;
      this.videoLink = this.storageDirectory +'1.mp4';
    } else {
      this.result = 2;
      this.videoLink = 'https://res.cloudinary.com/amitabh/video/upload/v1531732419/Paratroopers_Earning_the_Badge_-_Indian_Army_Motivational_-_Veer_by_Discovery.mp4';
    }
});
}

playFromDevice(){
  this.streamingMedia.playVideo(this.videoLink, this.options);
}

playFromLink(){
   this.streamingMedia.playVideo(this.videoLink, this.options);
  }
  }
