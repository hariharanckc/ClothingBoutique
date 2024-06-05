import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  profileopen: boolean = true;

  productlist: any;
  addtocart: any;
  token!: number | string;
  demo!: string | null;
  token1!: string | null;

  constructor(public staffservice: StaffService, private router: Router, public userservcie: UserService) { }

  ngOnInit(): void {
    this.profile();
    this.getallproducts();
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('login')
    }
    // if (localStorage.getItem('usertoken') === null) {
    //   this.router.navigateByUrl('/main')
    // }
    // this.demo = localStorage.getItem('token')
    // this.checkuserphone();
    // this.token1 = localStorage.getItem('usertoken')

  }



  profile() {
    this.profileopen = !this.profileopen;
  }
  getallproducts() {
    this.staffservice.getproducts().subscribe((res: any) => {
      console.log(res);
      this.productlist = res.rows.map((res: any) => {
        return res.doc.data
      })

    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser')
    this.router.navigateByUrl('login');
  }
  // checkuserphone() {
  //   this.userservcie.checkuserphone(this.demo).subscribe((res: any) => {
  //     console.log(res);
  //   })
  // }
}
