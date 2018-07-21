import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { AdminPayEmployeePage } from '../admin-pay-employee/admin-pay-employee';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AdminEditPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-edit-pay',
  templateUrl: 'admin-edit-pay.html',
})
export class AdminEditPayPage {
  public editPayForm: FormGroup;

  // @ViewChild('bonus') bonus;
  // @ViewChild('deduction') deduction;
  // @ViewChild('medical') medical;

  _idInEditPay = this.navParams.get('Id');

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiOpertions: ApiOperationsProvider,
    public alertController: AlertController,
    public toastController: ToastController,
    public viewCtrl: ViewController
  ) {

    this.editPayForm = this.formBuilder.group({
      bonus: new FormControl ('', [Validators.required , Validators.pattern('^[0-9]+(\.[0-9]{2})?$')]),
      deduction: new FormControl ('', [Validators.required , Validators.pattern('^[0-9]+(\.[0-9]{2})?$')]),
      medical:  new FormControl ('', [Validators.required , Validators.pattern('^[0-9]+(\.[0-9]{2})?$')])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEditPayPage');
    console.log('UserId', this.navParams.get('Id'));
  }
  
  update() {
    this.apiOpertions.editPayslips(
      this._idInEditPay,
      this.editPayForm.controls['bonus'].value,
      this.editPayForm.controls['deduction'].value,
      this.editPayForm.controls['medical'].value
    )
    .subscribe(
      (response: any) => {
      if (response.error === false) {
            // alert(response.msg);
            // this.router.navigate(['/admin/payemp']);

            console.log(response);

            this.apiOpertions.markAsPaid(
              this._idInEditPay
            )
            .subscribe(
              (res: any) => {
                if (res.error === false) {
                  this.presentToast(1);
                  this.navCtrl.push(AdminPayEmployeePage);
                } else {
                  this.presentToast (2);
                }
              },
              error => {
                console.log('Inner Part',error);
              }
            );

      } else {
        this.presentToast(2);
      }
      },
      error => {
        console.log('Outer Part',error);
      }
    );
  }

  doAlert(statusCode: number, msg?: string) {
    if(statusCode === 1){
      let alert = this.alertController.create({
          title: 'Success!!',
          message: 'Paid Employee Successfully',
          buttons: ['Ok']
      });
      alert.present()
    } else if(statusCode === 2){
      let alert = this.alertController.create({
          title: 'Error!!',
          message: msg,
          buttons: ['Ok']
      });
      alert.present()
    } 
  }

  presentToast(statusCode) {
    if(statusCode === 1){
    let toast = this.toastController.create({
      message: 'Paid Employee Successfully!!',
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  } else if(statusCode === 2){
    let toast = this.toastController.create({
      message: 'Error!!',
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}

dismiss(){
  this.viewCtrl.dismiss();
}

}
