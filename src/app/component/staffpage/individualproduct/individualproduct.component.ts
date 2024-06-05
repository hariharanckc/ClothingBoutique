import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individualproduct',
  templateUrl: './individualproduct.component.html',
  styleUrls: ['./individualproduct.component.css']
})
export class IndividualproductComponent implements OnInit{
  detail: any;
  constructor(public router:ActivatedRoute){}
  ngOnInit(): void {
this.router.queryParams.subscribe((res:any)=>{
  console.log(res['mydetails']);
  this.detail=JSON.parse(res['mydetails'])
  console.log(this.detail);
})
  }

}
