import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';

import { ApiOperationsProvider } from '../providers/api-operations/api-operations';
import { JwtInterceptorProvider } from '../providers/jwt-interceptor/jwt-interceptor';

import { AdminDashboardPage } from '../pages/admin-dashboard/admin-dashboard';
import { AdminCreateAccountPage } from '../pages/admin-create-account/admin-create-account';
import { AdminApproveLeavePage } from '../pages/admin-approve-leave/admin-approve-leave';
import { AdminApproveLeaveModalPage } from '../pages/admin-approve-leave-modal/admin-approve-leave-modal';
import { AdminCreatePayslipsPage } from '../pages/admin-create-payslips/admin-create-payslips';
import { AdminPayEmployeePage } from '../pages/admin-pay-employee/admin-pay-employee';
import { AdminEditPayPage } from '../pages/admin-edit-pay/admin-edit-pay';
import { AdminDeleteUserPage } from '../pages/admin-delete-user/admin-delete-user';

import { EmpDashboardPage } from '../pages/emp-dashboard/emp-dashboard';
import { EmpApplyForLeavePage } from '../pages/emp-apply-for-leave/emp-apply-for-leave';
import { EmpLeaveStatusPage } from '../pages/emp-leave-status/emp-leave-status';
import { EmpPayslipPage } from '../pages/emp-payslip/emp-payslip';

import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { OfflineVideoPage } from '../pages/offline-video/offline-video';

import { VideoPlayer } from '@ionic-native/video-player';

import { StreamingMedia } from '@ionic-native/streaming-media';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { ListPage } from '../pages/list/list';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MomentModule } from 'angular2-moment';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { OfflineVideo2Page } from '../pages/offline-video2/offline-video2';

import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ForgetPasswordPage,

    AdminDashboardPage,
    AdminCreateAccountPage,
    AdminApproveLeavePage,
    AdminApproveLeaveModalPage,
    AdminCreatePayslipsPage,
    AdminPayEmployeePage,
    AdminEditPayPage,
    AdminDeleteUserPage,

    EmpDashboardPage,
    EmpApplyForLeavePage,
    EmpLeaveStatusPage,
    EmpPayslipPage,
    EditProfilePage,

    ListPage,
    OfflineVideoPage,
    OfflineVideo2Page
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ForgetPasswordPage,
    AdminDashboardPage,
    AdminCreateAccountPage,
    AdminApproveLeavePage,
    AdminApproveLeaveModalPage,
    AdminCreatePayslipsPage,
    AdminPayEmployeePage,
    AdminEditPayPage,
    AdminDeleteUserPage,
    
    EmpDashboardPage,
    EmpApplyForLeavePage,
    EmpLeaveStatusPage,
    EmpPayslipPage,
    EditProfilePage,

    ListPage,
    OfflineVideoPage,
    OfflineVideo2Page

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiOperationsProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorProvider,
      multi: true
    },
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    StreamingMedia,
    VideoPlayer,
    PhotoLibrary
  ]
}
)
export class AppModule {}
