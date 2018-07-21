import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpDashboardPage } from './emp-dashboard';

@NgModule({
  declarations: [
    EmpDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpDashboardPage),
  ],
})
export class EmpDashboardPageModule {}
