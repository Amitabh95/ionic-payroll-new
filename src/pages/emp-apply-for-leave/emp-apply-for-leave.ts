import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { EmpDashboardPage } from '../emp-dashboard/emp-dashboard';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EmpApplyForLeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emp-apply-for-leave',
  templateUrl: 'emp-apply-for-leave.html',
})
export class EmpApplyForLeavePage {
  public applyForLeaveForm: FormGroup;

  // @ViewChild('leaveType') leaveType;
  // @ViewChild('dateFrom') dateFrom ;
  // @ViewChild('dateTo') dateTo;
  // @ViewChild('reason') reason;

  // minDateTo: any;
  // minDateFrom: any;

 // myDate : String = new Date().toISOString();

  constructor(
      private formBuilder: FormBuilder,
      public navCtrl: NavController,
      public navParams: NavParams,
      public apiOperations: ApiOperationsProvider,
      public alertController: AlertController
    ) {
      // this.minDateTo = moment().format('YYYY-MM-DD');
      // this.minDateFrom =  moment(this.minDateTo).add('days', 1).format('YYYY-MM-DD');

      this.applyForLeaveForm = this.formBuilder.group({
        leaveType: new FormControl ('', [Validators.required]),
        dateFrom: new FormControl ('', [Validators.required]),
        dateTo:  new FormControl ('', [Validators.required]),
        reason:  new FormControl ('', [Validators.required]),
      });
      

  }

  ionViewDidLoad() {

  }

  createLeave(){
    const changedDateFrom = moment(this.applyForLeaveForm.controls['dateFrom'].value).format('DD/MM/YYYY');
    const changedDateTo = moment(this.applyForLeaveForm.controls['dateTo'].value).format('DD/MM/YYYY');
    this.apiOperations.applyForLeave(
      this.applyForLeaveForm.controls['leaveType'].value,
      changedDateFrom,
      changedDateTo,
      this.applyForLeaveForm.controls['reason'].value
    ).subscribe(
      (response: any) => {
        if (response.error === false) {
          console.log(response);
          this.doAlert(1);
          this.navCtrl.push(EmpDashboardPage);
        } else {
          this.doAlert(2);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  minDateFrom(): string { 
      return moment().format('YYYY-MM-DD');
  }

  minDateTo(): string{
    return moment().add(1,'day').format('YYYY-MM-DD');
  }

  doAlert(statusCode: number) {
    if(statusCode === 1){
      let alert = this.alertController.create({
          title: 'Success!',
          message: 'Leave Created Succesfully!!',
          buttons: ['Ok']
      });
      alert.present()
    } else if(statusCode === 2){
      let alert = this.alertController.create({
          title: 'Error',
          message: 'Please check the inputs and fill again.',
          buttons: ['Ok']
      });
      alert.present()
    }
  }

}
