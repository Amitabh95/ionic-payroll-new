import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EmpDashboardPage } from '../pages/emp-dashboard/emp-dashboard';
import { EmpLeaveStatusPage } from '../pages/emp-leave-status/emp-leave-status';
import { EmpPayslipPage } from '../pages/emp-payslip/emp-payslip';
import { AdminDashboardPage } from '../pages/admin-dashboard/admin-dashboard';
import { AdminCreateAccountPage } from '../pages/admin-create-account/admin-create-account';
import { AdminApproveLeavePage } from '../pages/admin-approve-leave/admin-approve-leave';
import { AdminDeleteUserPage } from '../pages/admin-delete-user/admin-delete-user';
import { AdminPayEmployeePage } from '../pages/admin-pay-employee/admin-pay-employee';

import { EmpApplyForLeavePage } from '../pages/emp-apply-for-leave/emp-apply-for-leave';

import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  name: string;
  desg: string;
  public token: any;

  empPages: Array<{title: string, component: any}>;
  adminPages: Array<{title: string, component: any}>;
  isAdmin: any;
  // rootAdminPage: any = AdminDashboardPage;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage
  ) {
      
      

    this.initializeApp();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.empPages = [
      {title: 'Employee Dashboard', component: EmpDashboardPage},
      {title: 'Leave Status', component: EmpLeaveStatusPage},
      {title: 'View Payslip', component: EmpPayslipPage},
      {title: 'Apply For Leave', component: EmpApplyForLeavePage}
    ];

    this.adminPages = [
      {title: 'Admin Dashboard', component:AdminDashboardPage},
      {title: 'Create Account' , component: AdminCreateAccountPage},
      {title: 'Create Payslips', component: AdminCreateAccountPage},
      {title: 'Approve Leave', component: AdminApproveLeavePage},
      {title: 'Delete User', component: AdminDeleteUserPage},
      {title: 'Pay Employee', component: AdminPayEmployeePage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.roleCheckerProvider.getUser()
      // .subscribe(
      //   (success: any) => {
      //     this.name = success.user.name.full;
      //     this.desg = success.user.designation;
      //   },
      //   err => console.log(err)
      // )
     
      this.storage.get('currentUser').then((val) => {
        this.token = val;
      });

      if(this.token !== null && this.token !== undefined){

          if(this.IsAdmin(this.token)){
              this.isAdmin = true;
          }
          else {
              this.isAdmin = false;
          }
    }
    });
  }

  IsAdmin(token: string): boolean {
    const decoded = jwt_decode(token);
    if (decoded.isAdmin === true){
      return true;
    } else if ( decoded.isAdmin === false ) {
      return false;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(page.component);
  }

  
}

