import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { SignupService } from 'src/app/services/signup.service';
import * as CryptoJS from 'crypto-js';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorPhnNO: boolean = false;
  showError: boolean = false;
  phoneNumber!: any;
  Password: any;
  showeye: boolean = false;
  get: any;
  showErrors: any;
  constructor(public router: Router, private renderer: Renderer2, public fb: FormBuilder, private signup: SignupService, private title: Title, public adminservice: AdminService) { }
  loginform!: FormGroup
  ngOnInit(): void {
    this.title.setTitle("ClothingBoutiques -|- Login");
    this.loginform = this.fb.group({
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Password: ['', [Validators.required, Validators.minLength(8),

      this.customPasswordValidator]]
    })
    this.getid();
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('userdashboard')
      
    }
    // if(localStorage.getItem('token')){
    //     this.router.navigateByUrl('staffdashboard')
    // }
    

    
  }
  customPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    // Implement custom validation logic here (e.g., check for uppercase, lowercase, numbers, special characters)
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(control.value);
    return valid ? null : { 'invalidPassword': true };
  }
  eye() {
    this.showeye = !this.showeye;
  }
  inviteFacebook() {

    Swal.fire("Now The Service Is Not Available", "", "error");

  }
  inviteInstagram() {

    Swal.fire("Now The Service Is Not Available", "", "error");

  }



  invitewhatsapp() {

    Swal.fire("Now The Service Is Not Available", "", "error");


  }

  getid() {
    this.adminservice.getrollid().subscribe((res: any) => {
      console.log(res.rows);
      this.get = res.rows.map((resp: any) => {
        return resp.value._id
      }
      )
    })
    console.log(this.get);

  }


  //check existing userlogin
  login() {

    this.signup.checkExistingUser(this.loginform.value.phonenumber).subscribe((users: any) => {
      console.log(users.rows);
      if (users.rows.length === 1) {
        const decryptedPassword = CryptoJS.AES.decrypt(users.rows[0].value.data.password, 'secret key').toString(CryptoJS.enc.Utf8);
        if (decryptedPassword === this.loginform.value.Password) {
          console.log(this.loginform.value.password);
          Swal.fire("Login Successfull", "", "success");
          localStorage.setItem('token', this.loginform.value.phonenumber);
          localStorage.setItem('currentUser', JSON.stringify(users.rows[0].value));
          this.clearData();
          console.log(users.rows[0].value.data.RollId);
          console.log(this.get);

          if (users.rows[0].value.data.RollId === this.get[0]) {
            // this.router.navigate(['facescanning', users.rows[0].value._id])
            this.router.navigateByUrl('admindashboard');
            console.log(users.rows[0].value._id);
            // localStorage.setItem('admintoken', this.get[0]);

          }
          else if (users.rows[0].value.data.RollId === this.get[1]) {
            this.router.navigateByUrl('staffdashboard');
            // localStorage.setItem('stafftoken', this.get[1]);

          }
          else if (users.rows[0].value.data.RollId === this.get[2]) {
            this.router.navigateByUrl('userdashboard');
            // localStorage.setItem('usertoken', this.get[2]);

          }
        }
        else {
          this.loginform.value.showErrors = 'Incorrect password';
          this.loginform.value.Password = "";
          // this.loginform.value.showError = true;
        }
      } else {
        this.loginform.value.showErrors = 'User not found';
        this.clearData();
      }
    });
  }

  //clear formdata
  clearData() {
    this.loginform.value.phonenumber = "";
    this.loginform.value.Password = "";
  }
  validation() {

    if (this.loginform.value.phonenumber && this.loginform.value.Password) {
      this.login();
    }
  }
  oauth() {
    this.router.navigateByUrl('/oauth');
  }

}
