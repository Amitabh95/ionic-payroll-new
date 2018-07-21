import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCreateAccountPage } from './admin-create-account';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminCreateAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCreateAccountPage),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AdminCreateAccountPageModule {}
