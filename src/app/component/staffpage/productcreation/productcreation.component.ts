import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { StaffService } from 'src/app/services/staff.service';
import { AddtocartService } from 'src/app/services/addtocart.service';

@Component({
  selector: 'app-productcreation',
  templateUrl: './productcreation.component.html',
  styleUrls: ['./productcreation.component.css']
})
export class ProductcreationComponent implements OnInit {




  menuopen: boolean = true;
  showsplash: boolean = true;
  profileopen: boolean = true;

  // Name: string = 'ljlkj';
  // Phone: string = ''; 
  //  SID: string = '';
  Section!: string;
  showError: string = '';
  // private unsubscribe$ = new Subject<void>();
  categories: string[] = [
    'Mens', 'WOMENS', 'KIDS'
  ];


  isPopupVisible1: boolean = false;
  isPopupVisible2: boolean = false;
  isPopupVisible3: boolean = false;
  isPopupVisible4: boolean = false;
  private isDragging = false;
  private startX!: number;

  imageURL: string = "";
  Pname: string = "";
  OriginalPrice!: number;
  Offer!: number;
  Stock!: number;

  productcreation!: FormGroup
  staffproductlist: any;
  showerror: string = "";
  constructor(public router: Router, public fb: FormBuilder, public staffservice: StaffService) { }
  ngOnInit(): void {
    this.productcreation = this.fb.group({
      imageURL: ['',],
      Pname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      OriginalPrice: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Offer: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Section: ['', [Validators.required]]
    })

    this.splash();

    this.profile();

  }
  calculation() {
    console.log(this.OriginalPrice);
    this.productcreation.value.Price = Math.floor(this.productcreation.value.OriginalPrice * this.productcreation.value.Offer / 100);
    console.log(this.productcreation.value.Price);
    this.submit();
  }


  submit() {
    console.log('works');

    if (this.productcreation && this.productcreation.value) {
      console.log('Form submitted:', this.productcreation.value);
      const couchstructure = {
        _id: "ProductCreation_2_" + uuidv4(),
        data: {
          imageURL: this.productcreation.value.imageURL,
          Pname: this.productcreation.value.Pname,
          OriginalPrice: this.productcreation.value.OriginalPrice,
          Offer: this.productcreation.value.Offer,
          Stock: this.productcreation.value.Stock,
          Price: this.productcreation.value.Price,
          Section: this.productcreation.value.Section,

          type: "ProductCreation"
        }
      }
      console.log(couchstructure);
      this.staffservice.create(couchstructure).subscribe(res => {
        console.log(res);
      })
  this.clear();
    }
  }

  validation() {
    if (this.productcreation.value.imageURL === "") {
      this.showerror = "Enter Staffname"
    } else if (this.productcreation.value.Pname === "") {
      this.showerror = "Enter Mobile Number"
    } else if (this.productcreation.value.OriginalPrice === "") {
      this.showerror = "Enter Salary"
    } else if (this.productcreation.value.Offer === "") {
      this.showerror = "click Gender"
    } else if (this.productcreation.value.Stock === "") {
      this.showerror = "Enter Stock"
    } else if (this.productcreation.value.Section === "") {
      this.showerror = "Select Section"
    }
    if (this.productcreation.value.imageURL && this.productcreation.value.Pname && this.productcreation.value.OriginalPrice && this.productcreation.value.Offer && this.productcreation.value.Stock && this.productcreation.value.Section) {
      Swal.fire('success!', 'Save Successfully!', 'success');
      this.calculation();

    }

  }
  home() {
    this.router.navigateByUrl('staffdashboard');
  }

  productupdation() {
    this.router.navigateByUrl("productupdation")
  }
  productcreation1(){
this.router.navigateByUrl("producreation")
}
  handleButtonTouchUp() {
    this.showsplash = false;

  }
  splash() {

    this.showsplash = false;
    setTimeout(() => {
      this.showsplash = true;
    }, 9000);

    this.offsplash();
  }
  offsplash() {

    this.showsplash = true;
    setTimeout(() => {
      this.showsplash = false;
    }, 5000);
  }
  clear(){
    this.productcreation.reset();
  }



  menubar() {
    this.menuopen = !this.menuopen;

  }

  showPopup1() {
    this.isPopupVisible1 = true;
    setTimeout(() => {
      this.isPopupVisible1 = false;

    }, 1000);
  } showPopup2() {
    this.isPopupVisible2 = true;
    setTimeout(() => {
      this.isPopupVisible2 = false;

    }, 1000);
  } showPopup3() {
    this.isPopupVisible3 = true;
    setTimeout(() => {
      this.isPopupVisible3 = false;

    }, 1000);
  } showPopup4() {
    this.isPopupVisible4 = true;
    setTimeout(() => {
      this.isPopupVisible4 = false;

    }, 1000);
  }

  profile() {
    this.profileopen = !this.profileopen;
  }

}


