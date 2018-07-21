import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpPayslipPage } from './emp-payslip';

@NgModule({
  declarations: [
    EmpPayslipPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpPayslipPage),
  ],
})
export class EmpPayslipPageModule {}
