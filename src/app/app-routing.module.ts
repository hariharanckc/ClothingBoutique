import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './component/loginpage/login/login.component';
import { SignupComponent } from './component/loginpage/signup/signup.component';
import { UserdashboardComponent } from './component/userpage/userdashboard/userdashboard.component';
import { StaffdashboardComponent } from './component/staffpage/staffdashboard/staffdashboard.component';
import { StaffupdationComponent } from './component/adminpage/staffupdation/staffupdation.component';
import { AdmindashboardComponent } from './component/adminpage/admindashboard/admindashboard.component';
import { FacescanningComponent } from './component/loginpage/facescanning/facescanning.component';
import { ProductcreationComponent } from './component/staffpage/productcreation/productcreation.component';
import { StaffauthService } from './services/staffauth.service';
import { ProductupdationComponent } from './component/staffpage/productupdation/productupdation.component';
import { UserheaderComponent } from './component/userpage/userheader/userheader.component';
import { BannerComponent } from './component/userpage/banner/banner.component';
import { ProductlistComponent } from './component/userpage/productlist/productlist.component';
import { DelivaryComponent } from './component/adminpage/delivary/delivary.component';
import { UnknownpageComponent } from './component/main/unknownpage/unknownpage.component';
import { StaffcreationComponent } from './component/adminpage/staffcreation/staffcreation.component';
import { UpdatestaffComponent } from './component/adminpage/updatestaff/updatestaff.component';
import { ProductsearchComponent } from './component/staffpage/productsearch/productsearch.component';
import { IndividualproductComponent } from './component/staffpage/individualproduct/individualproduct.component';

const routes: Routes = [
  {path:'',redirectTo:'/main', pathMatch:'full'},
  {path:'main',component:MainComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'userdashboard',component:UserdashboardComponent},
  {path:'admindashboard',component:AdmindashboardComponent},
  {path:'staffupdation',component:StaffupdationComponent},
  {path:'staffdashboard',component:StaffdashboardComponent},
  {path:'facescanning',component:FacescanningComponent},
  {path:"facescanning/:id",component:FacescanningComponent},
  {path:'productcreation',component:ProductcreationComponent},
  {path:'productupdation',component:ProductupdationComponent},
  {path:'userheader',component:UserheaderComponent},
  {path:'banner',component:BannerComponent},
  {path:'productlist',component:ProductlistComponent},
  {path:'delivery',component:DelivaryComponent},
  {path:'staffcreation',component:StaffcreationComponent},
  {path:'updatestaff',component:UpdatestaffComponent},
  {path:'productsearch',component:ProductsearchComponent},
  {path:'individualproduct',component:IndividualproductComponent},
  {path:'**',component:UnknownpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
