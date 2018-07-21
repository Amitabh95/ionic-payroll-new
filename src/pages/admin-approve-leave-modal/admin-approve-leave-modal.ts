import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { AdminApproveLeavePage } from '../admin-approve-leave/admin-approve-leave';

/**
 * Generated class for the AdminApproveLeaveModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-approve-leave-modal',
  templateUrl: 'admin-approve-leave-modal.html',
})
export class AdminApproveLeaveModalPage {

  _firstName = this.navParams.get('fName');
  _startDate = this.navParams.get('startDate');
  _endDate = this.navParams.get('endDate');
  _reason = this.navParams.get('reason');
  _Id= this.navParams.get('Id');
  _isRejected = this.navParams.get('isRejected');
  _isApprove = this.navParams.get('isApprove');
  _status: string ='';
  _statusApproved: boolean;
  _statusRejected: boolean;
  _statusPending: boolean;
  

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public apiOperations: ApiOperationsProvider,
      public alertController: AlertController,
      public toastController: ToastController,
      public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log(this._Id);
    console.log(this._isRejected);
    console.log(this._isApprove);
    if( this._isRejected === false && this._isApprove === false){
      this._status = 'Pending';
      this._statusPending = true;
      this._statusApproved = false;
      this._statusRejected = false;
      
    } else if (this._isRejected === true && this._isApprove === false ){
      this._status = 'Rejected';
      this._statusPending = false;
      this._statusApproved = false;
      this._statusRejected = true;

    } else if (this._isRejected === false && this._isApprove === true ){
      this._status = 'Approved';
      this._statusPending = false;
      this._statusApproved = true;
      this._statusRejected = false;
    }
    console.log(this._status);
  }
  changeStatus(status: string, id: string) {
    this.apiOperations.changeStatusAPI(status, id)
    .subscribe(
      (response: any) => {
        console.log(response);
        if (response.error === false) {
          this.presentToast(1);
            this.navCtrl.push(AdminApproveLeavePage);
        }
      },
      error => {
        console.log(error);
        this.presentToast(2);
      }

    );
}

doAlert(statusCode: number) {
  if(statusCode === 1){
    let alert = this.alertController.create({
        title: 'Success!',
        message: 'Leave Status Successfully Changed!',
        buttons: ['Ok']
    });
    alert.present();
    
  } 
  else if (statusCode === 2) {
    let alert = this.alertController.create({
      title: 'Error!',
      message: 'Problem in changing leave status!',
      buttons: ['Ok']
  });
  alert.present();
}
}

presentToast(statusCode) {
  if(statusCode === 1){
  let toast = this.toastController.create({
    message: 'Leave Status Successfully Changed!',
    duration: 4000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
  else if(statusCode === 2){
    let toast = this.toastController.create({
      message: 'Problem in changing leave status!',
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}

dismiss() {
  this.viewCtrl.dismiss();
}
}
