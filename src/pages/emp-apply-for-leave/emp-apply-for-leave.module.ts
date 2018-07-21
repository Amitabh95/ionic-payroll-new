import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpApplyForLeavePage } from './emp-apply-for-leave';

@NgModule({
  declarations: [
    EmpApplyForLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(EmpApplyForLeavePage),
  ],
})
export class EmpApplyForLeavePageModule {}
