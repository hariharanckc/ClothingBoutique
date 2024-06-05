import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { StaffprofileService } from 'src/app/services/staffprofile.service';

@Component({
  selector: 'app-staffupdation',
  templateUrl: './staffupdation.component.html',
  styleUrls: ['./staffupdation.component.css'],
})
export class StaffupdationComponent implements OnInit {
  returnArray: any;
  profileopen: boolean = true;
  getuserlist: any;
  openupdatedialog: boolean = true;
  searchparam: any;
  getphone: any;
  seletedUser: any;
  getid: any;
  openpopup1: boolean = false;
  get: any;
  openpopups: boolean=false;
  getrolldata: any;



  constructor(public router: Router,public staffprfileservice:StaffprofileService, public adminservice: AdminService, public fb: FormBuilder) { }

  updaterole!: FormGroup
  staffcreate!:FormGroup

  ngOnInit(): void {
    if (!localStorage.getItem('staffupdate')) {
      this.router.navigateByUrl('admindashboard');
    }
    this.staffcreate=this.fb.group({
      staffName:[''],
      Gender:[''],
      Email:[''],
      phoneNumber:[''],
      password:['']
    })

    this.getuserdetails();
    this.getrollid();



    this.updaterole = this.fb.group({
      userName: [''],
      Gender: [''],
      phoneNumber: [''],
      RollId: [''],
      Email:['']
    })

    this.profile();

  }

  validation() {
    this.updateUserdetail();
    Swal.fire('success', "successfully created", "success")

  }
  openpopup(){
    this.openpopups=true;
  }
  closepopup(){
    this.openpopups=false
  }
  getrollid() {
    this.adminservice.getrollid().subscribe((res: any) => {
      console.log(res.rows);
      this.getid = res.rows.map((res: any) => {
        return res.value
      })
    })
    console.log(this.getid);
    
  }
//   getrollids(){
//     this.adminservice.getrollid().subscribe((res:any)=>{
//       console.log(res);
      
//       this.getrolldata=res.row.map((res:any)=>{
//         return res.value._id
//       })
// console.log(this.getrolldata);

//     })
//   }

  submit(){
    const staffcreatestructure={
      _id:"staffcreate_2_"+ uuidv4(),
      data:{
        staffName:this.staffcreate.value.staffName,
        Gender:this.staffcreate.value.Gender,
        Email:this.staffcreate.value.Email,
        phoneNumber:this.staffcreate.value.phoneNumber,
        password:this.staffcreate.value.password,
        RollId:this.getid[1]._id,
        type:"staffcreate"
      }
    }
    console.log(staffcreatestructure);
    
this.staffprfileservice.create(staffcreatestructure).subscribe((res:any)=>{
  console.log(res);

})
  }

  profile() {
    this.profileopen = !this.profileopen;
    this.openpopup1 = false;
  }



  cancel() {
    this.openupdatedialog = true;
  }

  getuserdetails() {
    this.adminservice.getUserDetails().subscribe((res: any) => {
      console.log(res);
      this.getuserlist = res.rows.map((res: any) =>
        res.doc)
    })
  }

  updateUserdetail() {
    console.log(this.updaterole.value)
    console.log(this.seletedUser)
    const couchstructure = {
      data: {
        ...this.seletedUser.data,
        RollId: this.updaterole.value.RollId,
      }
    }
    console.log(this.seletedUser);

    console.log(couchstructure);
    this.adminservice.updateUserDetails(this.seletedUser._id, this.seletedUser._rev, couchstructure).subscribe((res: any) => {
      console.log(res);
      this.getuserdetails();


    })
    this.openupdatedialog = true;

  }
  editaction(staff: any) {
    this.openupdatedialog = false;
    this.updaterole.patchValue(staff.data);
    this.seletedUser = staff;
    console.log(this.seletedUser);
  }
  performDelete(staff: any) {
    this.openpopup1 = true;
    this.updaterole.patchValue(staff.data);
    this.seletedUser = staff;
  }
  deleted() {
    this.adminservice.deleteUserDetails(this.seletedUser._id, this.seletedUser._rev).subscribe((res: any) => {
      console.log(res);
      Swal.fire('success!', 'delete Successfully!', 'success');
      this.getuserdetails();
      this.openpopup1 = false;

    })
  }
  searchpnum() {
    if (this.searchparam.trim() == "") {
      this.getuserdetails();
    } else {
      this.adminservice.SearchUsersPhonenum(this.searchparam).subscribe((res: any) => {
        console.log(res);
        this.getuserlist = res.rows.map((s: any) => s.doc)
        console.log(this.getuserlist);

      })
    }
  }

  

  home() {
    localStorage.removeItem('staffupdate');
    this.router.navigateByUrl('admindashboard');
  }
  staffupdation(){

  }
  delivery(){
    this.router.navigateByUrl('delivery');

  }
}
