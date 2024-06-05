import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './component/loginpage/login/login.component';
import { SignupComponent } from './component/loginpage/signup/signup.component';
import { UserdashboardComponent } from './component/userpage/userdashboard/userdashboard.component';
import { StaffdashboardComponent } from './component/staffpage/staffdashboard/staffdashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StaffupdationComponent } from './component/adminpage/staffupdation/staffupdation.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { FacescanningComponent } from './component/loginpage/facescanning/facescanning.component';
import { ProductcreationComponent } from './component/staffpage/productcreation/productcreation.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductupdationComponent } from './component/staffpage/productupdation/productupdation.component';
import { AdmindashboardComponent } from './component/adminpage/admindashboard/admindashboard.component';
import { UserheaderComponent } from './component/userpage/userheader/userheader.component';
import { BannerComponent } from './component/userpage/banner/banner.component';
import { ProductlistComponent } from './component/userpage/productlist/productlist.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { DelivaryComponent } from './component/adminpage/delivary/delivary.component';
import { UnknownpageComponent } from './component/main/unknownpage/unknownpage.component';
import { StaffcreationComponent } from './component/adminpage/staffcreation/staffcreation.component';
import { UpdatestaffComponent } from './component/adminpage/updatestaff/updatestaff.component';
import {MatRadioModule} from '@angular/material/radio';
import { ProductsearchComponent } from './component/staffpage/productsearch/productsearch.component';
import { IndividualproductComponent } from './component/staffpage/individualproduct/individualproduct.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    UserdashboardComponent,
    StaffdashboardComponent,
    StaffupdationComponent,
    FacescanningComponent,
    ProductcreationComponent,
    ProductupdationComponent,
    AdmindashboardComponent,
    UserheaderComponent,
    BannerComponent,
    ProductlistComponent,
    DelivaryComponent,
    UnknownpageComponent,
    StaffcreationComponent,
    UpdatestaffComponent,
    ProductsearchComponent,
    IndividualproductComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatRadioModule,
    

    AngularSlickgridModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
