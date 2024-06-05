import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  couchdburl: string = 'https://192.168.57.185:5984';
  couchusername: string = 'd_couchdb';
  couchpassword: string = 'Welcome#2';
  databasename: any = 'clothingboutique';

  header = {
    'Authorization': `Basic ${btoa(this.couchusername + ':' + this.couchpassword)}`
  };

  constructor(private http: HttpClient) { }

  getUserDetails() {
    const read = `${this.couchdburl}/${this.databasename}/_design/view/_view/Userdetails?include_docs=true`;
    return this.http.get(read, {
      headers: this.header
    })
  }

  updateUserDetails(_id: string, _rev: string, doc: any) {
    const fetch = `${this.couchdburl}/${this.databasename}/${_id}?rev=${_rev}`;
    return this.http.put(fetch, doc, {
      headers: this.header
    })
  }
  deleteUserDetails(_id: string, _rev: string) {
    const fetch = `${this.couchdburl}/${this.databasename}/${_id}?rev=${_rev}`;
    return this.http.delete(fetch, {
      headers: this.header
    })
  }

  SearchUsersPhonenum(Phonenumber: string) {
    const read = `${this.couchdburl}/${this.databasename}/_design/ClothingBoutique/_search/CheckPnumber`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.couchusername + ':' + this.couchpassword) // Replace 'username' and 'password' with your actual credentials
    });
    return this.http.post(read, {
      "q": `type:UserDetails AND  phoneNumber: _*${Phonenumber}*`,
      "include_docs": true
    }, { headers: headers });
  }


  getDetail(id: string) {
    return this.http.get(`${this.couchdburl}/${this.databasename}/${id}`,
      { headers: this.header })

  }

  updateFace(res: any, face: any) {
    console.log(res, face)
    let id = res._id
    console.log(id);
    let rev = res._rev
    res.data['faceLandmark'] = face
    const createurl = `${this.couchdburl}/${this.databasename}/${id}?rev=${rev}`;
    this.http.put(createurl, res, { headers: this.header }).subscribe(ress => {
      console.log(ress)
    })

  }


  getrollid() {
    const createurl = `${this.couchdburl}/${this.databasename}/_design/view/_view/Role`;
    return this.http.get(createurl, {
      headers: this.header
    })
  }
  getdelivary(){
    const createurl = `${this.couchdburl}/${this.databasename}/_design/view/_view/Orders?include_docs=true`;
    return this.http.get(createurl, {
      headers: this.header
    })
  }
}
