import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';

@IonicPage()
@Component({
  selector: 'page-emp-leave-status',
  templateUrl: 'emp-leave-status.html',
})
export class EmpLeaveStatusPage {
  data: any = '';
  cl: number;
  pl: number;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public apiOperations: ApiOperationsProvider
    ) {
  }

  ionViewDidLoad() {
    this.apiOperations.showMyAllLeaves()
      .subscribe(
        (response: any) => {
          this.data = response.leaves;
          this.cl = response.leaves[0]._userId.casualLeave;
          this.pl = response.leaves[0]._userId.privilledgeLeaves;
          console.log(response);
        },
    error => {
        console.log(error);
    });
    console.log('ionViewDidLoad EmpLeaveStatusPage');
  }

}
