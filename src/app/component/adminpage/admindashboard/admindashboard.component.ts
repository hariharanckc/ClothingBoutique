import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  returnArray: any;
  constructor(public router: Router, public adminservice: AdminService) { }
  ngOnInit(): void {

    if (localStorage.getItem('staffupdate')) {
      this.router.navigateByUrl('staffupdation')
    }
  }
  delivery() {
    this.router.navigateByUrl('/delivery')
  }
  logout() {
    localStorage.removeItem('admin');
    this.router.navigateByUrl('');
  }
  staffupdation() {
    localStorage.setItem("staffupdate", "staffupdate")
    this.router.navigateByUrl("/staffupdation")
  }
  createstaff(){
    this.router.navigateByUrl("/staffcreation")
  }
}
