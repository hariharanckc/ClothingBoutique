import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  couchdburl: string = 'https://192.168.57.185:5984';
  couchusername: string = 'd_couchdb';
  couchpassword: string = 'Welcome#2';
  databasename: any = 'clothingboutique';


  header = {
    'Authorization': `Basic ${btoa(this.couchusername + ':' + this.couchpassword)}`
  };
  getstaffdetaisl: any;

  constructor(public http: HttpClient) { }
  create(document: any) {
    const createurl = `${this.couchdburl}/${this.databasename}`;
    return this.http.post(createurl, document, {
      headers: this.header
    });
  }

  getproducts() {
    const read = `${this.couchdburl}/${this.databasename}/_design/view/_view/ProductCreation?include_docs=true`
    return this.http.get(read, {
      headers: this.header
    })
  }

  updateproducts(_id: string, _rev: string, docs: any) {
    const update = `${this.couchdburl}/${this.databasename}/${_id}?rev=${_rev}`;
    return this.http.put(update, docs, { headers: this.header })
  }

  deleteproduct(_id: string, _rev: string) {
    const delete1 = `${this.couchdburl}/${this.databasename}/${_id}?rev=${_rev}`;
    return this.http.delete(delete1, { headers: this.header });

  }
}
