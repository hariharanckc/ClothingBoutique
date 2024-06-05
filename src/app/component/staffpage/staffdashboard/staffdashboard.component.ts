import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-staffdashboard',
  templateUrl: './staffdashboard.component.html',
  styleUrls: ['./staffdashboard.component.css']
})
export class StaffdashboardComponent implements OnInit {
  returnArray:any;
  profileopen:boolean=true;
  
  
  constructor(public router:Router,public adminservice:AdminService){}
  
    ngOnInit(): void {
//   if(!localStorage.getItem('token')){
// this.router.navigateByUrl('login')
//   }
    }
  
  productcreation(){
      localStorage.setItem("productcreate", "productcreate")
      this.router.navigateByUrl("productcreation")
  }
  
home(){

}
productupdation(){
  localStorage.setItem("productupdate", "productupdate")
  this.router.navigateByUrl("productupdation")
}
logout(){
  // localStorage.removeItem('token');
  // localStorage.removeItem('token')
  // this.router.navigateByUrl('login');
}
  }
  