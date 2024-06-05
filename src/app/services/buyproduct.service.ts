import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyproductService {
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

  update(_id: string, _rev: string, doc: any) {
    const updateurl = `${this.couchdburl}/${this.databasename}/${_id}/${_rev}`;
    return this.http.put(updateurl, doc, {
      headers: this.header
    })
  }

  searchdelivaryproducts(all: string) {
    const read = `${this.couchdburl}/${this.databasename}/_design/ClothingBoutique/_search/DeliveryDetails?`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.couchusername + ':' + this.couchpassword)
    });
    console.log(all)
    return this.http.post(read, {
      q: `type:Order  AND (Name:_*${all}* OR Mobilenumber: _*${all}* OR Streetname: _*${all}* OR Doorno: _*${all}* OR City: _*${all}* OR  Pincode: _*${all}* )`,
      include_docs: true
    }, { headers: headers });
  }
  
}
