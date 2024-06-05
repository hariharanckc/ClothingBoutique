import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Formatter } from 'angular-slickgrid';
import { AdminService } from 'src/app/services/admin.service';
import { StaffprofileService } from 'src/app/services/staffprofile.service';
import { v4 as uuidv4 } from 'uuid';

const updateFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  
  return `<button id="myButton"  style="background: rgb(74, 74, 168);color:white;border-radius:5px; height:31px; width:40vw
  (click)=openedit() " >Update</button>
  <div class="open" *ngIf=openedit>
  
  </div>  `
  ;
};


@Component({
  selector: 'app-staffcreation',
  templateUrl: './staffcreation.component.html',
  styleUrls: ['./staffcreation.component.css']
})
export class StaffcreationComponent implements OnInit {
  staffcreate!:FormGroup
  idincrement: number=0;
  mergeid: string="";
  data: any;
  update_id: any;
  update_rev: any;
  inc: number=0;
  returnArray: any;
  openpopups: boolean=false;

  
  constructor(public router: Router,public fb:FormBuilder, public adminservice: AdminService,public staffprofileservice:StaffprofileService) { }

  columnDefinitions = [
    { id: 'Staffid ', name: 'Staffid', field: 'Staffid', sortable: true,filterable:true },
    { id: 'Staffname', name: 'Staffname', field: 'Staffname', sortable: true,filterable:true  },
    { id: 'Gender', name: 'Gender', field: 'Gender', sortable: true,filterable:true  },
    { id: 'Address', name: 'Address', field: 'Address', sortable: true,filterable:true  },
    { id: 'Mobilenumber', name: 'Mobilenumber', field: 'Mobilenumber', sortable: true,filterable:true  },
    // { id: 'Ssalary', name: 'Ssalary', field: 'Ssalary', sortable: true , filterable: true,    },
    // { id: 'update', name: 'update', field: 'update',  sortable: true , filterable: true,  
    // formatter: updateFormatter, onCellClick: (event:any,row:any) => {
    // if (event) {
    //   // this.showAddNewForm(this.assetDoc[row.row].location)
    // }
  // }
      // },
  ];  

  gridOptions = {
    enableAutoResize: true,
    enableCellNavigation: true,
    enableSorting: true,
    enableFiltering: true,
   

}
  dataset:any[] =[];




  ngOnInit(): void {

    if (localStorage.getItem('staffupdate')) {
      this.router.navigateByUrl('staffupdation')
    }
    

    this.staffcreate=this.fb.group({
      Staffid:[''],
      Staffname:[''],
      Gender:[''],
      Address:[''],
      Mobilenumber:['']

    })
    this.getstaffdetail();
    this.getid();

    this.updateidnumber(this.data,this.idincrement);
  }
  delivery() {
    this.router.navigateByUrl('/delivery')
  }

  staffupdation() {
    localStorage.setItem("staffupdate", "staffupdate")
    this.router.navigateByUrl("/staffupdation")
  }
  createstaff(){
    this.router.navigateByUrl("/staffcreation")
  }
  openpopup(){
    this.openpopups=true;
  }
  closepopup(){
    this.openpopups=false
  }
  getstaffdetails(){
    // this.getstaffdetails.
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

getstaffdetail(){
  this.staffprofileservice.getstaffdetaisl().subscribe((res:any)=>{
    console.log(res);
    this.dataset=res.rows.reverse().map((res:any,index:number)=>{
      return { 
      id:index+1,
      Staffid:res.doc.data.Staffid,
      Staffname:res.doc.data.Staffname,
      Gender:res.doc.data.Gender,
      Address:res.doc.data.Address,
      Mobilenumber:res.doc.data.Mobilenumber
  }})
  console.log(this.dataset);
  
  })
}

}
