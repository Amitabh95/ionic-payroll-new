import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { UserIDUserName } from '../../models/Data';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AdminDeleteUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-delete-user',
  templateUrl: 'admin-delete-user.html',
})
export class AdminDeleteUserPage {
  public deleteUserForm: FormGroup;

  // @ViewChild('user') user;

  dataArray: UserIDUserName [];

  constructor(
        private formBuilder: FormBuilder,
        public navCtrl: NavController,
        public navParams: NavParams,
        public apiOperations: ApiOperationsProvider,
        public alertCtrl: AlertController,
        public toastController: ToastController
      ) {

  this.deleteUserForm = this.formBuilder.group({
    user: new FormControl ('', [Validators.required])
  });
  }

  ionViewDidLoad() {
    this.apiOperations.showAllUsers().subscribe(
      (response: any) => {
          if (response.error === false) {
            this.dataArray = response.users;
          }
        }
    );
  }

  deleteUser(){
    this.showConfirm();
  }

  deleteUserOperation(){
      this.apiOperations.deleteUser(this.deleteUserForm.controls['user'].value,).subscribe(
        (res: any) => {
            if (res.error === false) {
              console.log(res);
              this.presentToast(1);
              this.navCtrl.push(AdminDeleteUserPage);
            } else {
              console.log(res);
            }
          }
      );
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Alert',
      message: 'Do you want to delete the selected user?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteUserOperation();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(statusCode) {
    if(statusCode === 1){
    let toast = this.toastController.create({
      message: 'User Deleted Successfully',
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}

}
