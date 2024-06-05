import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffprofileService {
  couchdburl: string = 'https://192.168.57.185:5984';
  couchusername: string = 'd_couchdb';
  couchpassword: string = 'Welcome#2';
  databasename: any = 'clothingboutique';


  header = {
    'Authorization': `Basic ${btoa(this.couchusername + ':' + this.couchpassword)}`
  };
  constructor(public http: HttpClient) { }
  create(document: any) {
    const createurl = `${this.couchdburl}/${this.databasename}`;
    return this.http.post(createurl, document, {
      headers: this.header
    });
  }

  getid(){
    const getid=`${this.couchdburl}/${this.databasename}/6f5756b23ac6118f9a8d7c19f7578da9`;
    return this.http.get(getid,{
      headers:this.header
    })
  }


  updateid(id: string, rev: string, data: number): Observable<any> { 
    const updateid = `${this.couchdburl}/${this.databasename}/${id}?rev=${rev}`;
    return this.http.put(updateid, data, {
      headers: this.header
    });
  }
  getstaffdetaisl(){
    const Getstaffdetail=`${this.couchdburl}/${this.databasename}/_design/view/_view/Getstaffdetail?include_docs=true`;
    return this.http.get(Getstaffdetail,{
      headers:this.header
    })
}
}

