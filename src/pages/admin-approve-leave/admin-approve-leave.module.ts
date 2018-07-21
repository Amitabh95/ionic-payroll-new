import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminApproveLeavePage } from './admin-approve-leave';
// import { DatePicker } from '@ionic-native/date-picker';

@NgModule({
  declarations: [
    AdminApproveLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminApproveLeavePage),
    // DatePicker
  ],
})
export class AdminApproveLeavePageModule {}
