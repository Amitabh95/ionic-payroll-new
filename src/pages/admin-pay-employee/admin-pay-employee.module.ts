import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPayEmployeePage } from './admin-pay-employee';

@NgModule({
  declarations: [
    AdminPayEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPayEmployeePage),
  ],
})
export class AdminPayEmployeePageModule {}
