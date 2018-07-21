import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { File } from '@ionic-native/file';
declare let cordova: any;

@IonicPage()
@Component({
  selector: 'page-offline-video2',
  templateUrl: 'offline-video2.html',
})
export class OfflineVideo2Page {
  public storageDirectory: string = '';
  videoLink;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer:DomSanitizer,
    private file: File,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {

      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.applicationStorageDirectory;
      }

      else if(this.platform.is('android')) {
    
          this.file.createDir(this.file.externalDataDirectory, 'Payroll', true).then((result)=>{
              console.log("Directory created"+result);
          });
      
          this.storageDirectory = cordova.file.externalDataDirectory + 'Payroll/1.mp4';
          console.log(this.storageDirectory);
      }
      else {
          return false;
      }
  });
  }

  ionViewDidLoad() {
       this.videoLink = this.sanitizer.bypassSecurityTrustUrl(this.storageDirectory);
  }

}
