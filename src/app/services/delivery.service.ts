import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
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
}
