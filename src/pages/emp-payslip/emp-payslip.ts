import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EmpPayslipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emp-payslip',
  templateUrl: 'emp-payslip.html',
})
export class EmpPayslipPage {
  public viewPayslipForm: FormGroup;
  // @ViewChild('month') month;
  // @ViewChild('year') year;

  tempData: any = '';
  monthYear: any;

  constructor(
      private formBuilder: FormBuilder,
      public navCtrl: NavController,
      public navParams: NavParams,
      public apiOperations: ApiOperationsProvider,
      public alertController: AlertController
    ) {
      this.viewPayslipForm = this.formBuilder.group({
        month: new FormControl ('', [Validators.required]),
        year: new FormControl ('', [Validators.required])
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpPayslipPage');
  }

  showPayslips() {
    this.apiOperations
  .showMyPaySlips(this.viewPayslipForm.controls['month'].value, this.viewPayslipForm.controls['year'].value,)
  .subscribe((response: any) => {
    if (response.payslip === null) {
      this.doAlert(1);
    } else {
    console.log(response);
    this.tempData = response.payslip;
  }
});
  }

  doAlert(statusCode: number) {
    if(statusCode === 1){
      let alert = this.alertController.create({
          title: 'Error!',
          message: 'No payslips are available according to the given inputs!',
          buttons: ['Ok']
      });
      alert.present()
    } }

}
