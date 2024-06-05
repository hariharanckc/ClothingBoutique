import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SignupService } from 'src/app/services/signup.service';
import { Title } from '@angular/platform-browser';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userName!: string;
  phoneNumber!: string;
  password!: string;
  Gender!: string;
  Email!: string;
  addItemForm!: FormGroup;
  showErrorUserName: boolean = false;
  showErrorPhnNO: boolean = false;
  showError: boolean = false;
  showeye: boolean = false;

  private unsubscribe$ = new Subject<void>();
  showErrorGender: boolean = false;
  showErrorEmail: boolean = false;
  showError1!: string;



  constructor(
    private router: Router,
    private signupservice: SignupService,
    private title: Title, public fb: FormBuilder) { }

  signupform!: FormGroup
  ngOnInit(): void {
    this.title.setTitle("ClothingBoutiques -|- signup");
    this.signupform = this.fb.group({
      userName: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      Gender: ['', [Validators.required]],
      Email: ['',  [Validators.required, Validators.email]],
      phoneNumber: ['',  [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8),

        this.customPasswordValidator]],
    })
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


  onSubmit() {
    const encryptedPassword = CryptoJS.AES.encrypt(this.signupform.value.password, 'secret key').toString();
    const couchstructure = {
      _id: "UserDetails_2_" + uuidv4(),
      data: {
        userName: this.signupform.value.userName,
        Gender: this.signupform.value.Gender,
        Email: this.signupform.value.Email,
        phoneNumber: this.signupform.value.phoneNumber,
        password: encryptedPassword,
        type: "UserDetails",
        RollId: "User_2_2d4639e4-6639-44c8-a1a8-ec9698c7be08"
      }
    }

    // localStorage.setItem('token', this.phoneNumber);
    console.log(couchstructure);
    this.signupservice.create(couchstructure).subscribe(res => {
      console.log(res);
      Swal.fire("signup Successfull", "", "success");
      this.router.navigateByUrl("login");
      this.clear();

    })


  }

  checkUserExistence() {

    this.signupservice.checkExistingUser(this.signupform.value.phoneNumber).subscribe((res: any) => {
      console.log(res);
      if (res.rows.length != 0) {
        this.showError1="phone number exists";
      } else {
        this.showError1="user does not exists";

        this.onSubmit();
      }



    })
  }

  clear(){
    this.signupform.reset();
  }

  validation() {

    this.showErrorUserName = false;
    this.showErrorPhnNO = false;
    this.showErrorGender = false;
    this.showErrorEmail = false;
    this.showError = false;

    const phoneNumberPattern = /^[0-9]{10}$/;

    if (this.signupform.value.userName == null) {
      this.showErrorUserName = true;
    }
    if (this.signupform.value.Gender === null) {
      this.showErrorGender = true;
    }
    if (this.signupform.value.Email === null) {
      this.showErrorEmail = true;
    }

    if (this.signupform.value.phoneNumber == null || !phoneNumberPattern.test(this.signupform.value.phoneNumber)) {
      this.showErrorPhnNO = true;
    }

    if (!this.signupform.value.password) {
      this.showError = true;
    }
    if (this.signupform.value.userName && this.signupform.value.Gender && this.signupform.value.Email && this.signupform.value.phoneNumber && this.signupform.value.password && phoneNumberPattern.test(this.signupform.value.phoneNumber)) {
      this.showErrorUserName = false;
      this.showErrorPhnNO = false;
      this.showErrorGender = false;
      this.showErrorEmail = false;
      this.showError = false;

      this.checkUserExistence();
    }
  }




}
