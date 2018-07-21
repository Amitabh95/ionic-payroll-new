import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { HomePage } from '../home/home';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  public forgetPasswordForm: FormGroup;
//@ViewChild('email') email;

  constructor(
      private formBuilder: FormBuilder,
      public navCtrl: NavController,
      public navParams: NavParams,
      public apiOperations: ApiOperationsProvider,
      public toastController: ToastController,
      public alertController: AlertController
    ) {
      this.forgetPasswordForm = this.formBuilder.group({
        email:  new FormControl ('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  resetPassword(){
  this.apiOperations.forgetPassword(this.forgetPasswordForm.controls['email'].value)
      .subscribe((response: any) => {
        if (response.error === false) {
          this.presentToast(1);
          this.navCtrl.push(HomePage);
        } else {
          this.doAlert(1);
        }
        }
      );
  }

  presentToast(statusCode) {
    if(statusCode === 1){
    let toast = this.toastController.create({
      message: 'Password Reset Email Sent Successfully',
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}

doAlert(statusCode: number) {
  if(statusCode === 1){
    let alert = this.alertController.create({
        title: 'Error!',
        message: 'Wrong Email Entered!',
        buttons: ['Ok']
    });
    alert.present()
  } 
}
}
