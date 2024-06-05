import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffprofileService } from 'src/app/services/staffprofile.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-updatestaff',
  templateUrl: './updatestaff.component.html',
  styleUrls: ['./updatestaff.component.css']
})
export class UpdatestaffComponent implements OnInit {
  
staffcreate!:FormGroup
  idincrement: number=0;
  mergeid: string="";
  data: any;
  update_id: any;
  update_rev: any;
  inc: number=0;

  constructor(public router:Router,public fb:FormBuilder,public staffprofileservice:StaffprofileService){}
  ngOnInit(): void {

    this.staffcreate=this.fb.group({
      Staffid:[''],
      Staffname:[''],
      Gender:[''],
      Address:[''],
      Mobilenumber:['']

    })
    this.getid();
    this.updateidnumber(this.data,this.idincrement);
  }

  submit(){
    const staffcreate={
      _id:"staffcreate_2_"+ uuidv4(),
      data:{
        Staffid:this.staffcreate.value.Staffid,
        Staffname:this.staffcreate.value.Staffname,
        Gender:this.staffcreate.value.Gender,
        Address:this.staffcreate.value.Address,
        Mobilenumber:this.staffcreate.value.Mobilenumber,
        type:"staffcreate"
      }
    }
    this.staffprofileservice.create(staffcreate).subscribe((res:any)=>{
      console.log(res);
      this.getid();
      this.updateidnumber(this.data,this.idincrement);
    })
  }
  
getid(){
  this.staffprofileservice.getid().subscribe((res:any)=>{ 
    console.log(res)
    this.data=res;
    this.idincrement=res.data.ID +1
    this.mergeid="SID"+this.idincrement.toString().padStart(4,'0')
    this.staffcreate.value.Staffid=this.mergeid
 } )
 
}

updateidnumber(data:any,increment:number){
  this.update_id=data._id;
  this.update_rev=data._rev;
  console.log(this.update_id,this.update_rev);
  data.data.ID=increment;
console.log( 
 this.staffprofileservice.updateid(this.update_id,this.update_rev,data).subscribe((res:any)=>{
  console.log(res);
 })
);
this.getid();

}

}
