import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
// import { HomePage } from '../../pages/home/home';
// import { NavController } from 'ionic-angular';

@Injectable()
export class ApiOperationsProvider {

  private url = 'http://139.59.14.81:3000/api/v1';

  constructor(
    public http: HttpClient,
    public storage: Storage,
   // public navCtrl: NavController
  ) {}

  login(loginEmail: string, loginPassword: string): Observable<any> {
    return this.http.post<any>( this.url + '/login', { loginEmail: loginEmail, loginPassword: loginPassword });
  }

  logout() {
    this.storage.remove('currentUser');
    // this.navCtrl.push(HomePage);
  }

    createUser (
      first: string,
      last: string,
      email: string,
      designation: string,
      casualLeave: number,
      privilledgeLeaves: number,
      baseSalary: number,
      address: string
    ): Observable<any>  {
      return this.http.post<any>( this.url + '/createuser',
        { name:
            {
              first: first,
              last: last
            },
          email: email,
          designation: designation,
          casualLeave: casualLeave,
          privilledgeLeaves: privilledgeLeaves,
          baseSalary: baseSalary,
          address: address
        });
    }

    showAllPendingLeaves(): Observable<any> {
      return this.http.get<any>( this.url + '/allleave');
    }

    changeStatusAPI(status: string, id: string) {
      return this.http.put<any>( this.url + '/changestatus/' + id, { status: status});
    }

    showAllUsers() {
      return this.http.get<any>( this.url + '/alluser/', {});
    }

    createLeave(month: string, _userId) {
      return this.http.post<any>( this.url + '/createpayslip/', { month: month, _userId: _userId});
    }

    showAllPayDetails(): Observable<any> {
      return this.http.get<any>( this.url + '/allpayslip');
    }
    editPayslips(id: string, bonus: number, deduction: number, medical: number) {
      return this.http.put<any>( this.url + '/editpayslip/' + id,
        {
          bonus : bonus,
          deduction: deduction,
          medical: medical
        });
    }
    markAsPaid(id: string) {
      return this.http.put<any>( this.url + '/markaspaid/' + id, {});
    }

    applyForLeave(
      leaveType: string,
      startDate: string,
      endDate: string,
      reason: string
    ): Observable<any> {
      return this.http.post<any>( this.url + '/createLeave', {
        leaveType: leaveType,
        startDate: startDate,
        endDate: endDate,
        reason: reason
      });
    }

    showMyAllLeaves(): Observable<any> {
      return this.http.get<any>( this.url + '/allmyleave');
    }
  
    showMyPaySlips(month: number, year: number): Observable<any> {
      return this.http.get<any>( this.url + '/payslip/' + month + '/' + year);
    }

    forgetPassword(email: string): Observable<any> {
      return this.http.post<any>( this.url + '/sendchangepassmail', { handle: email });
    }

    deleteUser(id: string): Observable<any> {
      return this.http.delete<any>( this.url + '/deleteuser/' + id, {});
}
}