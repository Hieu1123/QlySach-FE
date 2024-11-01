import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


export interface LoginRequest {
  userName : string;
  password : string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  readonly APIUrlAuth ="http://localhost:5095/api/Login"
  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  Login(request : LoginRequest) : Observable<any>{
    return  this.http.post(`${this.APIUrlAuth}/Login`, request);
  }
  setToken(token : string){
    localStorage.setItem("Token", token);
  }
  Logout(){
    localStorage.removeItem("Token");
    this.router.navigate(['/Login']);
  }
  getToken(): string | null{
    return localStorage.getItem("Token")
  }

  isLoggedIn() :boolean {
    return  this.getToken() !== null;
  }
}
