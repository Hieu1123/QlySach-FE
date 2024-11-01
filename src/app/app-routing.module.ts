import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SachComponent } from './sach/sach.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';

import { AddDanhmucComponent } from './danhmuc/add-danhmuc/add-danhmuc.component';
import { EditDanhMucComponent } from './danhmuc/edit-danh-muc/edit-danh-muc.component';
import { AddSachComponent } from './sach/add-sach/add-sach.component';
import { EditSachComponent } from './sach/edit-sach/edit-sach.component';
import { LoginComponent } from './Login/login/login.component';

const routes: Routes = [
  {path: "Login", component:LoginComponent},
  
  {path: "DanhMuc", component:DanhmucComponent },  
  {path: "AddDanhMuc", component:AddDanhmucComponent },
  {path: "EditDanhMuc/:id", component:EditDanhMucComponent},
 
  {path: "Sach", component:SachComponent},
  {path: "AddSach", component:AddSachComponent},
  {path: "EditSach/:id", component:EditSachComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
