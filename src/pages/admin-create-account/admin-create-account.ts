import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiOperationsProvider } from '../../providers/api-operations/api-operations';

import { AlertController } from 'ionic-angular';
import { AdminDashboardPage } from '../admin-dashboard/admin-dashboard';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-admin-create-account',
  templateUrl: 'admin-create-account.html',
})
export class AdminCreateAccountPage {
  public createAccountForm: FormGroup;

  // @ViewChild('firstName') firstName;
  // @ViewChild('lastName') lastName;
  // @ViewChild('email') email;
  // @ViewChild('Designation') Designation;
  // @ViewChild('casualLeave') casualLeave;
  // @ViewChild('privilegeLeave') privilegeLeave;
  // @ViewChild('baseSalary') baseSalary;
  // @ViewChild('address') address;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiOperations: ApiOperationsProvider,
    public alertController: AlertController
  ) {

  this.createAccountForm = this.formBuilder.group({
    firstName: new FormControl ('', [Validators.required, Validators.pattern('[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')]),
    lastName: new FormControl ('', [Validators.required, Validators.pattern('[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')]),
    email:  new FormControl ('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    Designation:  new FormControl ('', [Validators.required, ]),
    casualLeave:  new FormControl ('', [Validators.required, Validators.maxLength(1), Validators.minLength(2), Validators.pattern('^[0-9]{1,2}$')]),
    privilegeLeave :  new FormControl ('', [Validators.required , Validators.maxLength(1), Validators.minLength(2), Validators.pattern('^[0-9]{1,2}$')]),
    baseSalary: new FormControl ('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{2})?$')]),
    address: new FormControl ('', [Validators.required])
});
  }

  ionViewDidLoad() {
  }

  // get f() {
  //   return this.createAccountForm.controls;
  // }
  // createAccount() {
  //   this.createAccountForm.valid
  //   this.createAccountForm.value

  // }

  createAccount(){
    this.apiOperations.createUser(
      this.createAccountForm.controls['firstName'].value,
      this.createAccountForm.controls['lastName'].value,
      this.createAccountForm.controls['email'].value,
      this.createAccountForm.controls['Designation'].value,
      this.createAccountForm.controls['casualLeave'].value,
      this.createAccountForm.controls['privilegeLeave'].value,
      this.createAccountForm.controls['baseSalary'].value,
      this.createAccountForm.controls['address'].value,

    ).subscribe((response: any) => {
      console.log(response);
      if (response.error === false) {
        this.doAlert(1);
        this.navCtrl.push(AdminDashboardPage);
      } else {
        this.doAlert(2);
      }
    } ,
      error => {
      console.log(error);
      
  });
  }

  doAlert(statusCode: number) {
    if(statusCode === 1){
      let alert = this.alertController.create({
          title: 'Success!',
          message: 'User Created Succesfully!!',
          buttons: ['Ok']
      });
      alert.present()
    } else if(statusCode === 2){
      let alert = this.alertController.create({
          title: 'Error',
          message: 'Please check the inputs and fill again.',
          buttons: ['Ok']
      });
      alert.present()
    }
  }
}
