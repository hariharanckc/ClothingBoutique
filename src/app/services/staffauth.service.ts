import { Injectable } from '@angular/core';
import {  CanActivate,  Router,} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StaffauthService implements CanActivate {

  constructor(public router: Router) { }

  canActivate() {
    const token = localStorage.getItem('stafftoken')
    if (token) {
      return true;
    } else {
      return this.router.parseUrl('login')
    }
  }
}