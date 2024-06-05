import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  couchdburl: string = 'https://192.168.57.185:5984';
  couchusername: string = 'd_couchdb';
  couchpassword: string = 'Welcome#2';
  databasename: any = 'clothingboutique';


  header = {
    'Authorization': `Basic ${btoa(this.couchusername + ':' + this.couchpassword)}`
  };
  constructor(private http: HttpClient) { }


  create(document: any) {
    const createurl = `${this.couchdburl}/${this.databasename}`;
    return this.http.post(createurl, document, {
      headers: this.header
    });
  }

  checkExistingUser(phone: any) {
    const read = `${this.couchdburl}/${this.databasename}/_design/view/_view/PhoneSearch?key=${phone}`;
    return this.http.get(read, {
      headers: this.header
    })
  }

  checkExistingUserLogin(role: any) {
    const read = `${this.couchdburl}/${this.databasename}/_design/view/_view/PhoneSearch?key=${role}`;
    return this.http.get(read, {
      headers: this.header
    })
  }

}
