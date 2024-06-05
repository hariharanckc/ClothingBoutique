import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {

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
  getcartbyProduct(userID: any) {
    const read = `${this.couchdburl}/${this.databasename}/_design/view/_view/AddCart?key="${userID}"`;
    return this.http.get(read, {
      headers: this.header
    })
  }

  //getcartview all docs
  getcartbyquantity(){
    const read=`${this.couchdburl}/${this.databasename}/_design/view/_view/AddCart`;
    return this.http.get(read, {
      headers: this.header
    })
  }
  //getalldocs paticular keys
  getcartbyallkeys(_id:any){
    const read=`${this.couchdburl}/${this.databasename}/_all_docs?keys=["${_id}"]&include_docs=true`;
    return this.http.get(read, {
      headers: this.header
    })}
  
}
