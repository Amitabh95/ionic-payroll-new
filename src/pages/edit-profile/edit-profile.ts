import { Component } from '@angular/core';

import { IonicPage, NavController , NavParams, ActionSheetController , LoadingController, ToastController, Platform, AlertController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { PhotoLibrary } from '@ionic-native/photo-library';

declare let cordova: any;
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  name = this.navParams.get('name');
  designation = this.navParams.get('designation');
  email = this.navParams.get('email');
  upload: boolean = false;
  public photos : any;
  public base64Image : string;
  public profilePicture: any;
  public storageDirectory: string = '';


  imageURI:any;
  finalImageLink:any ;
  imageFileName: any;
  imageLocation: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public platform: Platform,
    private file: File,
    public storage: Storage,
    private photoLibrary: PhotoLibrary,
    public alertCtrl: AlertController
  ) {

    this.platform.ready().then(() => {

      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.applicationStorageDirectory;
      }

      else if(this.platform.is('android')) {
    
          file.createDir(file.externalDataDirectory, 'Payroll/Images', true).then((result)=>{
              console.log("Directory created"+result);
          });
      
          this.storageDirectory = cordova.file.externalDataDirectory + 'Payroll/Images/';
          console.log(this.storageDirectory);
      }
      else {
          return false;
      }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.storage.get(this.email).then((val) => {
      this.profilePicture = val;
  });
    // console.log(this.upload);
  }
  
  // for picking up image from library
  getImage(sourceType) {
    const options: CameraOptions = {
      quality: 70,
      saveToPhotoAlbum: true,
      sourceType: sourceType,
      destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };
  
    this.camera.getPicture(options).then((imageData) => {
      this.upload = true;
      this.imageURI = imageData;
      // console.log("image date", imageData);
      // const indexOfJPG = imageData.indexOf(".jpg") + 4;
      // const slicedURI = imageData.slice(0, indexOfJPG);
      // console.log(slicedURI);
      // console.log('1',this.imageURI);

    }, (err) => {
      console.log('2',JSON.stringify(err));
      this.presentToast(err);
    });
    this.upload = false;
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Upload a new profile picture',
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getImage(0);
          }
        },{
          text: 'Click Photo',
          handler: () => {
            this.getImage(1);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: JSON.stringify(msg),
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: any = {
      fileKey: 'file',
      fileName: 'ionicfile',
      file: 'data:image/jpeg;base64',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {},
      params:{'upload_preset':'ljoixb8n'},
    }
  
    fileTransfer.upload(this.imageURI, 'https://api.cloudinary.com/v1_1/amitabh/image/upload', options)
      .then((data) => {
      console.log('3',JSON.stringify(data)+" Uploaded Successfully");
      // this.imageFileName = "https://api.cloudinary.com/v1_1/amitabh/image/upload/profile.jpg";
      const a = JSON.parse(data.response);
      this.finalImageLink = a.url;
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
      this.upload = false;
      this.storage.set(this.email, this.finalImageLink);
    }, (err) => {
      console.log('4',JSON.stringify(err));
      loader.dismiss();
      this.presentToast(err);
    });
 
  }
  // takePhoto() {
  //   const options : CameraOptions = {
  //     quality: 50, // picture quality
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options) .then((imageData) => {
  //       this.base64Image = "data:image/jpeg;base64," + imageData;
  //       this.photos.push(this.base64Image);
  //       this.photos.reverse();
  //     }, (err) => {
  //       console.log('5',err);
  //     });
  // }

  downloadToGallery(){
//     console.log('hii',this.imageFileName);
//     const options = {
//       thumbnailWidth: 512,
//       thumbnailHeight: 384,
//       quality: 1,
//       includeAlbumData: false
//     };
//     this.photoLibrary.requestAuthorization().then(() => {
//     this.photoLibrary.saveImage(this.imageURI,'Payroll/', options).then(
//     (library) => { 
//       const alertSuccess = this.alertCtrl.create({
//         title: `Download Succeeded!`,
//         subTitle: `Successfully downloaded to Gallery: ${library}`,
//         buttons: ['Ok']
//       });
  
//       alertSuccess.present();
//     },
//     (err) => {
//       const alertFailure = this.alertCtrl.create({
//         title: `Error!`,
//         subTitle: `Error in downloading to Gallery: ${err}`,
//         buttons: ['Ok']
//       });
  
//       alertFailure.present();
//     }
//   );
// })
// .catch(err => {
//   const alertFailure = this.alertCtrl.create({
//     title: `Error!`,
//     subTitle: `permissions weren\'t granted: ${err}`,
//     buttons: ['Ok']
//   });

//   alertFailure.present();
//   console.log('permissions weren\'t granted');
// });


this.platform.ready().then(() => {
  /*file.checkDir(file.externalDataDirectory, 'newDir').then( => console.log('Directory exists')).catch(err =>
  console.log('Directory doesnt exist'));
  console.log('new Directory is created');
  */
});

const fileTransfer: FileTransferObject = this.transfer.create();
      this.storage.get(this.email).then((val) => {
        const galleryLocation = 'file:///storage/emulated/0/Pictures/Payroll/Images/';
        this.imageLocation = val;
        console.log(this.imageLocation);
      fileTransfer.download(this.imageLocation, galleryLocation + 'Profile Photo.jpg').then((entry) => {
          
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
            subTitle: `was not downloaded. Error code: ${JSON.stringify(error)}`,
            buttons: ['Ok']
          });
  
          alertFailure.present();
  
        });
    });
    
  
}

  downloadToAppData(){

      this.platform.ready().then(() => {
        /*file.checkDir(file.externalDataDirectory, 'newDir').then( => console.log('Directory exists')).catch(err =>
        console.log('Directory doesnt exist'));
        console.log('new Directory is created');
        */
      });
      const fileTransfer: FileTransferObject = this.transfer.create();
      this.storage.get(this.email).then((val) => {
        this.imageLocation = val;
        console.log(this.imageLocation);
      fileTransfer.download(this.imageLocation, this.storageDirectory + '1.jpg').then((entry) => {
          
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
            subTitle: `was not downloaded. Error code: ${JSON.stringify(error)}`,
            buttons: ['Ok']
          });
  
          alertFailure.present();
  
        });
    });
    
  
      
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  }

