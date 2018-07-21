import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCreatePayslipsPage } from './admin-create-payslips';

@NgModule({
  declarations: [
    AdminCreatePayslipsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCreatePayslipsPage),
  ],
})
export class AdminCreatePayslipsPageModule {}
