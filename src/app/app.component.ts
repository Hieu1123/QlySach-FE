import { Component, OnInit } from '@angular/core';
import { DanhMucService } from './service/danhmuc/danh-muc.service';
import { AuthService } from './service/Auth/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    private danhMucService : DanhMucService,
    private authService : AuthService,
    private router : Router
  ){}
  ngOnInit(): void {
  }
 

  title = 'QlySach';

  logOut(){
    if(confirm("Bạn có chắc chắn muốn đăng xuất không ?")){
      this.authService.Logout();
      this.router.navigate([""])
    }
  }
}
