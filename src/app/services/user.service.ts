import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  couchdburl: string = 'https://192.168.57.185:5984';
  couchusername: string = 'd_couchdb';
  couchpassword: string = 'Welcome#2';
  databasename: any = 'clothingboutique';

  header = {
    'Authorization': `Basic ${btoa(this.couchusername + ':' + this.couchpassword)}`
  };

  constructor(public http: HttpClient) { }
  checkuserphone(Phone: any) {
    const read = `${this.couchdburl}/${this.databasename}/_design/view/_view/Userphonenum?Key="${Phone}"&include_docs=true`;
    return this.http.get(read, {
      headers: this.header
    })
  }

}
