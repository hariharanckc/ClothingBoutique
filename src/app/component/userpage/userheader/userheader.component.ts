import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddtocartService } from 'src/app/services/addtocart.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {
  currentUser: any;
  getlist: any;
  openprofile: boolean=false;
  getid: any;
  getids: any;
  getallproductsandquantity: any[]=[];
  constructor(public router: Router, public cartservice: AddtocartService) { }
  opencart: boolean = true;
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    this.getcart();
    // if (localStorage.getItem('token')) {
    //   this.router.navigateByUrl('login')
    // }
  }

  addtocart() {
    this.opencart = false;
  }
  closeaddtocart() {
    this.opencart = true;
  }

  getcart() {
    this.cartservice.getcartbyProduct(this.currentUser._id).subscribe((res: any) => {
      console.log(res);
      if(res.rows.length){ 
        //individual doc
      this.getlist = res.rows.map((res: any) =>  res.value[0]),
      console.log(this.getlist),
      
      //indivijudalid 
      this.getid=res.rows.map((res:any)=>res.value[1]),
      console.log(this.getid),
      
      this.cartservice.getcartbyallkeys(this.getid.join('","')).subscribe((res:any)=>{
this.getids=res.rows.filter((res:any)=>{
return !!res.doc  
});
console.log(this.getids);
for(const getlist of this.getlist){
  for(const getallid of this.getids ){
    // console.log(getlist);
    // console.log(getallid);
    console.log(getallid);
    if( getlist.data.Product_ID === getallid.id){
      console.log("crt");
      const struct={
        Grandtotal:getlist.data.Grandtotal,
        Product_ID:getlist.data.Product_ID,
        User_ID:getlist.data.User_ID,
        Quantity:getlist.data.Quantity,
        _id:getallid.doc._id,
        Offer:getallid.doc.data.Offer,
        OriginalPrice:getallid.doc.data.OriginalPrice,
        Pname:getallid.doc.data.Pname,
        Price:getallid.doc.data.Price,
        Section:getallid.doc.data.Section,
        Stock:getallid.doc.data.Stock,
        imageURL:getallid.doc.data.imageURL
      }
      console.log(struct);
      this.getallproductsandquantity.push(struct)

      
    }
  }
}

      })
      }
    })
  }
  profiles(){
    this.openprofile=true;
  }
  closeprofile() {
    this.openprofile = false;
  }


}
