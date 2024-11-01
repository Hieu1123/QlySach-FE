import { Component, OnInit } from '@angular/core';
import { AuthService, LoginRequest } from '../../service/Auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userName! : string;
  password! : string;

  constructor(
    private authService : AuthService,
    private router : Router,
  ){}

  ngOnInit(): void {}

  login(){
    const request : LoginRequest = {
      userName :  this.userName,
      password : this.password,
    };

    this.authService.Login(request).subscribe({
      next : res =>{
        const token = res.token
        this.authService.setToken(token);
        this.router.navigate([""]);
      },error: error =>{
        alert("Ten dang nhap hoac mat khau khong dung");
        console.error(error);
      }
    })

  }

}
