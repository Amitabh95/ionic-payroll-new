import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import * as jwt_decode from '../../../node_modules/jwt-decode';

import { EmpApplyForLeavePage } from '../emp-apply-for-leave/emp-apply-for-leave';
import { EmpLeaveStatusPage } from '../emp-leave-status/emp-leave-status';
import { EmpPayslipPage } from '../emp-payslip/emp-payslip';
import { HomePage } from '../home/home';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { EditProfilePage } from '../edit-profile/edit-profile';

/**
 * Generated class for the EmpDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emp-dashboard',
  templateUrl: 'emp-dashboard.html',
})
export class EmpDashboardPage {
  name: any;
  designation:any;
  email: any;
  public token: any;
  public profilePicture: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertController: AlertController,
    public apiOperations: ApiOperationsProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.storage.get('currentUser').then((val) => {
      this.token = val;
      if(!(this.token === null || this.token === undefined)) {
      this.presentLoading();
      
      const decoded: any = jwt_decode(this.token);
      this.name = decoded.name;
      this.designation = decoded.designation;
      this.email = decoded.email;
      this.storage.get(this.email).then((val) => {
        this.profilePicture = val;
    });
    } else {
      this.doAlert(1);
      this.navCtrl.push(HomePage);
    }

  });
      
  }

  doAlert(statusCode: number) {
    if(statusCode === 1){
      let alert = this.alertController.create({
          title: 'Token Error!',
          message: 'Please login again!',
          buttons: ['Ok']
      });
      alert.present()
    } 
  }

  goToApplyForLeave(){
      this.navCtrl.push(EmpApplyForLeavePage);
  }

  goToLeaveStatus(){
      this.navCtrl.push(EmpLeaveStatusPage);
  }

  goToViewPayslips(){
      this.navCtrl.push(EmpPayslipPage);
  }

  logout(){
    this.showConfirm();
    
  }

  showConfirm() {
    const confirm = this.alertController.create({
      title: 'Logout',
      message: 'Do you want to Logout?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.apiOperations.logout();
            this.navCtrl.push(HomePage);
            console.log('Agree clicked');
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

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1500
    });
    loader.present();
  }
  goToEditProfile(){
    this.navCtrl.push(EditProfilePage, { name: this.name, email: this.email, designation: this. designation });
  }
}

