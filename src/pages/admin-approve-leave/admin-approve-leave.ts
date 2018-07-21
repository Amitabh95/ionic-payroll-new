import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';
import { AdminApproveLeaveModalPage } from '../admin-approve-leave-modal/admin-approve-leave-modal';

/**
 * Generated class for the AdminApproveLeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-approve-leave',
  templateUrl: 'admin-approve-leave.html',
})
export class AdminApproveLeavePage {
  data: any = '';
  newData : any [] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiOperations: ApiOperationsProvider,
    public modalController: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.apiOperations.showAllPendingLeaves()
      .subscribe(
        (response: any) => {
          this.data = response.leaves;
          console.log(response);
          this.loadNewData();
        },
        error => {
            console.log(error);
        }
  );
    console.log('ionViewDidLoad AdminApproveLeavePage');
  }

  presentApproveLeaveModal(
    fname: string,
    startDate: string,
    endDate: string,
    reason: string,
    id: string,
    rejected: boolean,
    approve: boolean
  ){
    let profileModal = this.modalController.create(AdminApproveLeaveModalPage, 
      {
        fName: fname,
        startDate : startDate,
        endDate: endDate,
        reason: reason,
        Id: id,
        isRejected: rejected,
        isApprove: approve
      });
    profileModal.present();
  }

//   changeStatus(status: string, id: string) {
//     this.apiOperations.changeStatusAPI(status, id)
//     .subscribe(
//       (response: any) => {
//         console.log(response);
//       },
//       error => {
//         console.log(error);
//       }

//     );
// }

  loadNewData() {
    this.data.forEach(element => {
      if(element._userId !== null && element._userId !== undefined){
        this.newData.push(element);
      }   
    });
    console.log(this.newData);
  }
}
