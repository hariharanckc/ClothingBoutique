import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { BuyproductService } from 'src/app/services/buyproduct.service';

@Component({
  selector: 'app-delivary',
  templateUrl: './delivary.component.html',
  styleUrls: ['./delivary.component.css']
})
export class DelivaryComponent implements OnInit{
  searchparam: any;
getdelivarylist: any;

  constructor(public router:Router,public adminservice:AdminService,public buyservice:BuyproductService){}
  ngOnInit(): void {
this.getdelivarydetails();

  }

  getdelivarydetails(){
    this.adminservice.getdelivary().subscribe((res:any)=>{
      console.log(res);
      this.getdelivarylist=res.rows.map((res:any)=>{
        return res.doc
      })
      console.log(this.getdelivarylist);
      
    })
  }

  searchpnum() {
    console.log(this.searchparam)
    if (this.searchparam.trim() === " ") {
      this.getdelivarydetails();
    } else {
      this.buyservice.searchdelivaryproducts(this.searchparam).subscribe((res: any) => { 
        console.log(res)
        this.getdelivarylist = res.rows.map((s: any) => s.doc)
        console.log(this.getdelivarylist);
    }) 
    }
  }

  home(){
this.router.navigateByUrl('admindashboard')
  }
  staffupdation(){
    this.router.navigateByUrl('staffupdation')
  }

  delivery(){

  }
}
