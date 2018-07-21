import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineVideoPage } from './offline-video';

@NgModule({
  declarations: [
    OfflineVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineVideoPage),
  ],
})
export class OfflineVideoPageModule {}
