import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpLeaveStatusPage } from './emp-leave-status';

@NgModule({
  declarations: [
    EmpLeaveStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpLeaveStatusPage),
  ],
})
export class EmpLeaveStatusPageModule {}
