import { HttpClient , HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the JwtInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JwtInterceptorProvider implements HttpInterceptor {
  public token: any;

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
    console.log('Hello JwtInterceptorProvider Provider');
    this.storage.get('currentUser').then((val) => {
      this.token = val;
      });
  }

  intercept(request, next) {
    const requestWithToken = request.clone({
        headers: request.headers.set(
            'Authorization', `Bearer ${this.token}`
        )
    });
    return next.handle(requestWithToken);
    }
}
