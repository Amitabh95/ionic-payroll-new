import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDeleteUserPage } from './admin-delete-user';

@NgModule({
  declarations: [
    AdminDeleteUserPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDeleteUserPage),
  ],
})
export class AdminDeleteUserPageModule {}
