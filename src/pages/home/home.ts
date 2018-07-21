import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { Storage } from '@ionic/storage';
import * as jwt_decode from '../../../node_modules/jwt-decode';

import { AlertController } from 'ionic-angular';

import { AdminDashboardPage } from '../../pages/admin-dashboard/admin-dashboard';
import { EmpDashboardPage } from '../emp-dashboard/emp-dashboard';
import { ForgetPasswordPage } from '../forget-password/forget-password';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public loginForm: FormGroup;
  // @ViewChild('usernameForm') username;
  // @ViewChild('passwordForm') password;

  public token: any;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public apiOperations: ApiOperationsProvider,
    public storage: Storage,
    public alertController: AlertController
  ) { 
    this.loginForm = this.formBuilder.group({
      username: new FormControl ('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl ('', [Validators.required])
    });
}

  ionViewDidLoad() {

  //   if(this.storage.get('currentUser') !== null){

  //       this.storage.get('currentUser').then((val) => {
  //         this.token = val;
  //         //this.forRoleRouting(this.token);
  //         console.log(this.token);
  //       });
  // }
  this.storage.get('currentUser').then((val) => {
        this.token = val;
        if(!(this.token === null || this.token === undefined)){
          this.forRoleRouting(this.token);
        }
        });

  // else {
  //   return;
  // }
    // if(this.token !== null && this.token !== undefined && this.token !== ''){
    //   console.log("hello");
    //   console.log("dekho bhai" , this.token);
    //   this.forRoleRouting(this.token);
    // }
  }

  signIn() {
    this.apiOperations.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(
      (res: any) => {
          if (res.error === false) {
              console.log(res);
              this.storage.set('currentUser', res.token);
              this.forRoleRouting(res.token);
          } else {
            console.log('else',res);
              this.doAlert(1);
              // Alert Wrong Username/Password.
          }
      }, error => {
        console.log(error);
      }
    );
  }

  forRoleRouting(token: string) {
    const decoded: any = jwt_decode(token);
    if (decoded.isAdmin === true) {
     this.navCtrl.push(AdminDashboardPage);
     // this.doAlert(2);
    } else if (decoded.isAdmin === false) {
     this.navCtrl.push(EmpDashboardPage);
     // this.doAlert(3);
    }
  }

  doAlert(statusCode: number) {
    if(statusCode === 1){
      let alert = this.alertController.create({
          title: 'Wrong Username/Password!',
          message: 'Please check your username and password!',
          buttons: ['Ok']
      });
      alert.present()
    } 
    else if (statusCode === 2) {
      let alert = this.alertController.create({
        title: 'Admin!',
        message: 'Admin!',
        buttons: ['Ok']
    });
    alert.present();
    }
    else if (statusCode === 3) {
      let alert = this.alertController.create({
        title: 'Emp!',
        message: 'Emp!',
        buttons: ['Ok']
    });
    alert.present();
    }
}
goToForgetPassword(){
  this.navCtrl.push(ForgetPasswordPage);
}
}
