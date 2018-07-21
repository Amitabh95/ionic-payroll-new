import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as jwt_decode from '../../../node_modules/jwt-decode';
import { Storage } from '@ionic/storage';

import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AdminCreateAccountPage } from '../admin-create-account/admin-create-account';
import { AdminApproveLeavePage } from '../admin-approve-leave/admin-approve-leave';
import { AdminCreatePayslipsPage } from '../admin-create-payslips/admin-create-payslips';
import { AdminPayEmployeePage } from '../admin-pay-employee/admin-pay-employee';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { AdminDeleteUserPage } from '../admin-delete-user/admin-delete-user';

import { App, MenuController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { OfflineVideoPage } from '../offline-video/offline-video';
import { OfflineVideo2Page } from '../offline-video2/offline-video2';

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {
  name: any;
  designation: any;
  email: any;
  public token: any;
  public profilePicture: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage,
      public alertController: AlertController,
      public apiOperations: ApiOperationsProvider,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public app: App,
      public menuController: MenuController
    ) {
      menuController.enable(true);
    }  
      

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
          console.log(this.profilePicture);
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

  goToCreateAccount(){
    this.navCtrl.push(AdminCreateAccountPage);
  }

  goToApproveLeaves(){
    this.navCtrl.push(AdminApproveLeavePage);
  }

  goToCreatePayslips(){
    this.navCtrl.push(AdminCreatePayslipsPage);
  }

  goToPayEmployee(){
    this.navCtrl.push(AdminPayEmployeePage);
  }

  goToDeleteUser(){
    this.navCtrl.push(AdminDeleteUserPage);
  }

  logout(){
    this.showConfirm();
    
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
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
      duration: 1000
    });
    loader.present();
  }

  goToEditProfile(){
    this.navCtrl.push(EditProfilePage, { name: this.name, email: this.email, designation: this. designation });
  }

  goToOfflineVideo(){
    this.navCtrl.push(OfflineVideoPage);
  }
  goToOfflineVideo2(){
    this.navCtrl.push(OfflineVideo2Page);
  }
}
