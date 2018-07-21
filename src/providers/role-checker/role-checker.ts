import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class RoleCheckerProvider {

  constructor(public http: HttpClient) { }

  isAdmin(token: string): boolean {
    const decoded = jwt_decode(token);
    if (decoded.isAdmin === true){
      return true;
    } else if ( decoded.isAdmin === false ) {
      return false;
    }
  }
}
