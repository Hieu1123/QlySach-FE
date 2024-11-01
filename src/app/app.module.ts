
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SachComponent } from './sach/sach.component';
import { AddSachComponent } from './sach/add-sach/add-sach.component';
import { ListSachComponent } from './sach/list-sach/list-sach.component';
import { EditSachComponent } from './sach/edit-sach/edit-sach.component';

import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { ListDanhmucComponent } from './danhmuc/list-danhmuc/list-danhmuc.component';
import { AddDanhmucComponent } from './danhmuc/add-danhmuc/add-danhmuc.component';
import { EditDanhMucComponent } from './danhmuc/edit-danh-muc/edit-danh-muc.component';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Login/login/login.component';
import { AuthInterceptorService } from './service/Auth/auth-interceptor.service';





@NgModule({
  declarations: [
    AppComponent,

    SachComponent,
    ListSachComponent,
    AddSachComponent,
    EditSachComponent,
    
    DanhmucComponent,
    ListDanhmucComponent,
    AddDanhmucComponent,
    EditDanhMucComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptorService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
