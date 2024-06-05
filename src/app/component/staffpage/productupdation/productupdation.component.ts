import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator,} from '@angular/material/paginator';
import { MatTableDataSource, } from '@angular/material/table';
import { Router } from '@angular/router';
import { get } from 'jquery';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productupdation',
  templateUrl: './productupdation.component.html',
  styleUrls: ['./productupdation.component.css']
})
export class ProductupdationComponent implements AfterViewInit, OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ELEMENT_DATA: any[] = [];
  getproducts: any[] = [];
  editid!: string;
  editrev!: string;
  openpopup: boolean = false;

  displayedColumns: string[] = ['ImageUrl', 'ProductName', 'OriginalPrice', 'Price', 'Stock', 'Offer', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<any>(this.getproducts);
  seletedUser: any;
  openpopup1: boolean = false;
  constructor(public staffservice: StaffService, public fb: FormBuilder,public router:Router) { }
  updateproduct!: FormGroup
  ngOnInit(): void {

    this.updateproduct = this.fb.group({
      imageURL: ['',],
      Pname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      OriginalPrice: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Offer: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Price: [''],
      Section: ['', [Validators.required]]
    })
    this.getproduct();

  }

  ngAfterViewInit() {
    console.log(this.paginator);
    this.dataSource.paginator = this.paginator;
  }


  getproduct() {
    this.staffservice.getproducts().subscribe((res: any) => {
      console.log(res.rows);
      this.getproducts = res.rows.map((res: any) => {
        return res.doc
      }
      )
      console.log(this.getproducts);
    })
  }
  updatepatch(product: any) {
    console.log(product);

    this.openpopup = true;
    this.editid = product._id;
    this.editrev = product._rev;
    console.log(this.editid, this.editrev);

    this.updateproduct.patchValue(product.data);

  }

  deletes(data: any) {
    this.openpopup1 = true;
    this.editid = data._id;
    this.editrev = data._rev;
    this.updateproduct.patchValue(data.data);
  }

  update() {

    const updatestructure = {
      _id: this.editid,
      _rev: this.editrev,
      data: {
        imageURL: this.updateproduct.value.imageURL,
        Pname: this.updateproduct.value.Pname,
        OriginalPrice: this.updateproduct.value.OriginalPrice,
        Offer: this.updateproduct.value.Offer,
        Stock: this.updateproduct.value.Stock,
        Price: this.calculation(),
        Section: this.updateproduct.value.Section,
        type: "ProductCreation"
      }
    }
    console.log(updatestructure);
    this.staffservice.updateproducts(this.editid, this.editrev, updatestructure).subscribe((res: any) => {
      console.log(res);
      Swal.fire('success!', 'product update Successfully!', 'success');
      this.openpopup = false;
      this.getproduct();
    })


  }

  calculation() {
    console.log(this.updateproduct.value.OriginalPrice);
    this.updateproduct.value.Price = Math.floor(this.updateproduct.value.OriginalPrice * this.updateproduct.value.Offer / 100);
    return this.updateproduct.value.Price
  }

  deleted() {
    this.staffservice.deleteproduct(this.editid, this.editrev).subscribe((res: any) => {
      console.log(res);
      Swal.fire('success!', 'product delete Successfully!', 'success');
      this.openpopup1 = false;
      this.getproduct();

    })
  }
  profile() {
    this.openpopup = false;
    this.openpopup1 = false;
  }
  home() {
    this.router.navigateByUrl('staffdashboard');
  }

  productupdation() {
    this.router.navigateByUrl("productupdation")
  }
  productcreation1(){
this.router.navigateByUrl("productcreation")
}
productsearch(){
  this.router.navigateByUrl("productsearch")
}

}


