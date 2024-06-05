import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddtocartService } from 'src/app/services/addtocart.service';
import { BuyproductService } from 'src/app/services/buyproduct.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  productlist: any;
  categories: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = 'all';
  buypopup: boolean = false;
  buyid!: string;
  buyrev!: string;
  showbuydetial: any;
  quantity: number = 1;
  total!: number;
  increasetotal!: number;
  reduce!: number;
  opencarts: boolean = false;
  showcartproduct: any;
  postMessage: any;
  diologData: any;
  dialog: any;
  currentUser: any;
  reviewopen: boolean = false;
  deliverypopup: boolean = false;
  getcartbyproductid: any;
  checkid: any;


  constructor(public staffservice: StaffService, public deliveryservice: DeliveryService, public cartservice: AddtocartService, public fb: FormBuilder, public buyproductservice: BuyproductService, public reviewservice: ReviewsService) { }

  buyproducts!: FormGroup;
  Order!: FormGroup;
  ngOnInit(): void {
    this.Order = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      Mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Doorno: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]+$')]],
      Streetname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      City: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      Pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
      Quantity: [''],
      Grandtotal: [''],
    })
    this.getallproducts();
    this.getreview();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    this.getcartquantity();
    this.sample();
  }




  getallproducts() {
    this.staffservice.getproducts().subscribe((res: any) => {
      console.log(res);
      this.productlist = res.rows.map((res: any) => {
        return res.doc
      })
      this.categorizeProducts();
      this.filterProductsByCategory();
    })
  }

  all() {
    this.getallproducts();
  }

  mens() {
    this.staffservice.getproducts().subscribe((product: any) => {
      this.productlist = product.rows.map((res: any) =>
        res.doc);
      console.log(this.productlist);
      this.filteredProducts = this.productlist.filter((resp: any) => {
        return resp.data.Section == "Mens"
      });
      console.log(this.filteredProducts);
    })
  }

  womens() {
    this.staffservice.getproducts().subscribe((product: any) => {
      this.productlist = product.rows.map((res: any) =>
        res.doc);
      console.log(this.productlist);

      this.filteredProducts = this.productlist.filter((resp: any) => {
        return resp.data.Section === "WOMENS"
      });
      console.log(this.filteredProducts);

    })
  }
  kids() {
    this.staffservice.getproducts().subscribe((product: any) => {
      this.productlist = product.rows.map((res: any) =>
        res.doc);
      console.log(this.productlist);

      this.filteredProducts = this.productlist.filter((resp: any) => {
        return resp.data.Section === "KIDS"
      });
      console.log(this.filteredProducts);

    })
  }
  private categorizeProducts() {
    this.categories = Array.from(new Set(this.productlist.map((p: any) => p.Section)));
  }

  filterProductsByCategory() {
    this.filteredProducts =
      this.selectedCategory === 'all' ? this.productlist : this.productlist.filter((resproduct: any) => resproduct.Section === this.selectedCategory);
  }

  profile() {
    this.buypopup = false;
    this.reviewopen = false;
  }
  Buyproduct(products: any) {
    console.log(products);
    this.showbuydetial = products;
    console.log(this.showbuydetial);
    this.increasetotal = products.data.Price,
      this.buypopup = true;
    this.buyid = products._id;
    this.buyrev = products._rev;

    console.log(this.buyid, this.buyrev);
  }


  buy() {
    this.deliverypopup = false;
    const couchstructure = {
      _id: "buyproduct_2_" + uuidv4(),
      data: {
        Doorno: this.buyproducts.value.Doorno,
        Streetname: this.buyproducts.value.Streetname,
        City: this.buyproducts.value.City,
        Pincode: this.buyproducts.value.Pincode,
        Reducestock: this.reduce,
        Quantity: this.quantity,
        Grandtotal: this.increasetotal,
        type: "buyproduct"
      }
    }
    console.log(couchstructure);
    this.buyproductservice.create(couchstructure).subscribe((res: any) => {
      console.log(res);
      this.updatebuyproduct();
    })
    this.updatestock();
    this.resert();
  }


  updatebuyproduct() {
    const updateproduct = {
      _id: this.buyid,
      _rev: this.buyrev,
      data: {
        ...this.showbuydetial.data,
        type: "ProductCreation"
      }
    }
    this.staffservice.updateproducts(this.buyid, this.buyrev, updateproduct).subscribe((res: any) => {
      console.log(res);
    })
  }

  validation() {
    if (this.buyproducts.value.Doorno && this.buyproducts.value.Streetname && this.buyproducts.value.City && this.buyproducts.value.Pincode) {
      console.log("create");

    }
    this.buy();
  }

  resert() {
    this.buyproducts.reset();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
    this.calculation();
    console.log(this.calculation());
    this.increasetotal = this.calculation();
  }
  increaseQuantity() {
    this.quantity++;
    this.calculation();
    console.log(this.calculation());
    this.increasetotal = this.calculation();
  }

  calculation() {
    this.total = this.quantity * this.showbuydetial.data.Price
    return this.total
  }

  updatestock() {
    this.showbuydetial.data.Stock = this.showbuydetial.data.Stock - this.quantity
    console.log(this.showbuydetial.data.Stock);
  }

  cartopen() {
    this.opencarts = false;
  }

  opencart(products: any) {
    this.opencarts = !this.opencarts;
    this.showcartproduct = products;
    this.buyid = products._id;
    this.buyrev = products._rev;
    console.log(this.buyid);
    console.log(this.buyrev);
    this.getreview();
  }



  sendReview() {

    const couchstructure = {
      _id: "Reviews_2_" + uuidv4(),
      data: {
        User_ID: this.currentUser._id,
        Comment: this.postMessage,
        Product_ID: this.buyid,
        type: "reviews"
      }
    }
    console.log(couchstructure);
    this.reviewservice.create(couchstructure).subscribe((res: any) => {
      console.log(res);
      this.postMessage = "";
      this.getreview();
    })
  }

  getreview() {
    this.reviewservice.getReviewbyProduct(this.buyid).subscribe((res: any) => {
      console.log(res.rows);
      this.dialog = res.rows.map((res: any) => {
        return res.value
      })
      console.log(this.dialog);
    })
  }

  review(product: any) {
    this.reviewopen = true;
    this.buyid = product._id;
    this.buyrev = product._rev;
    this.getreview();

  }


  addcart() {
    const addcartsructure = {
      _id: "addcart_2_" + uuidv4(),
      data: {
        User_ID: this.currentUser._id,
        Product_ID: this.buyid,
        Quantity: this.quantity,
        Grandtotal: this.increasetotal,
        type: "cart"
      }
    }
    console.log(addcartsructure);
    this.cartservice.create(addcartsructure).subscribe((res: any) => {
      console.log(res);
      Swal.fire('success!', 'AddtoCart create  Successfully!', 'success');
      this.buypopup = false;
    })
  }

  deliverycancel() {
    this.deliverypopup = false;
  }

  delivery() {
    this.buypopup = false;
    this.deliverypopup = true;
  }

  async getcartquantity() {
    //alldocs
    
    // this.cartservice.getcartbyquantity().subscribe((res: any) => {
    //   this.getcartbyproductid = res.rows.map((res: any) => {
    //     return res.value.data.Product_ID
    //   })
    //   console.log(this.getcartbyproductid);
    //   this.cartservice.getcartbyallkeys(this.getcartbyproductid.join('","')).subscribe((res: any) => {
    //     console.log(res.rows)
       
    //   }

    //   );

    // })

  }
  sample(){
    console.log(this.getcartquantity());
    
console.log(this.checkid);

  }

  submitOrder(){

  }

}

  // submitOrder() {
  //   const Orderstructure = {
  //     _id: "Order_2_" + uuidv4(),
  //     data: {
  //       User_ID: this.currentUser._id,
  //       Cart_ID: "",
  //       Name: this.Order.value.Name,
  //       Mobilenumber: this.Order.value.Mobilenumber,
  //       Doorno: this.Order.value.Doorno,
  //       Streetname: this.Order.value.Streetname,
  //       City: this.Order.value.City,
  //       Pincode: this.Order.value.Pincode,
  //       type: "Order"
  //     }
  //   }
  //   this.deliveryservice.create(Orderstructure).subscribe((res: any) => {
  //     console.log(res);
  //     Swal.fire('success!', 'Order  Successfully!', 'success');
  //     this.deliverypopup = false;

  //   })

  // }



