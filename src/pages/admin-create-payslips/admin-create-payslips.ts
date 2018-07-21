import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';

import { UserIDUserName } from '../../models/Data';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AdminCreatePayslipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-create-payslips',
  templateUrl: 'admin-create-payslips.html',
})
export class AdminCreatePayslipsPage {
  public createPayslipForm: FormGroup;

  // @ViewChild('empName') employeeName;
  // @ViewChild('month') month;
  // @ViewChild('year') year;

  dataArray: UserIDUserName [];

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiOperations: ApiOperationsProvider,
    public alertController: AlertController
  ) {

    this.createPayslipForm = this.formBuilder.group({
      employeeName: new FormControl ('', [Validators.required]),
      month: new FormControl ('', [Validators.required]),
      year:  new FormControl ('', [Validators.required])
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
    console.log('ionViewDidLoad AdminCreatePayslipsPage');
  }

  createPayslips() {
    
    const monthYear = this.createPayslipForm.controls['month'].value + '/' + this.createPayslipForm.controls['year'].value;
    this.apiOperations.createLeave(
      monthYear,
      this.createPayslipForm.controls['employeeName'].value
    ).subscribe((response: any) => {
      if (response.error === false) {
        this.doAlert(1);
        this.navCtrl.push(AdminDashboardPage);
      } else {
        this.doAlert(2);
      }
    } ,
      error => {
      console.log(error);
  });
  }

  doAlert(statusCode: number) {
    if(statusCode === 1){
      let alert = this.alertController.create({
          title: 'Success!',
          message: 'Payslip Created Successfully!',
          buttons: ['Ok']
      });
      alert.present();
    } else if (statusCode === 2) {
      let alert = this.alertController.create({
        title: 'Error!',
        message: 'Please check the inputs!',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
}
