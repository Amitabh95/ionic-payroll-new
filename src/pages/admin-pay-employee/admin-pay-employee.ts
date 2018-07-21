import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { AdminEditPayPage } from '../admin-edit-pay/admin-edit-pay';

/**
 * Generated class for the AdminPayEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-pay-employee',
  templateUrl: 'admin-pay-employee.html',
})
export class AdminPayEmployeePage {

  data: any;
  _id: any;
  newData : any [] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiOperations: ApiOperationsProvider,
    public modalController: ModalController
  ) {}

  ionViewDidLoad() {
    this.apiOperations.showAllPayDetails()
      .subscribe(
        (response: any) => {
            this.data = response.payslips;
            
            this.loadNewData();
        },
    error => {
        console.log(error);
    });
    console.log('ionViewDidLoad AdminPayEmployeePage');
  }

  // editPay(id: string) {
  //   this._id = id;
  //   this.data.forEach (payslips => {
  //     if (payslips._id === id ) {
  //       this.data.isPaid = true;
  //     }
  //     });
  // }

  loadNewData() {
    this.data.forEach(element => {
      if(element._userId !== null && element._userId !== undefined){
        this.newData.push(element);
      }   
    });
    console.log(this.newData);
  }

  presentProfileModal(id: string) {
    let profileModal = this.modalController.create(AdminEditPayPage, { Id: id });
    profileModal.present();
  }

}
