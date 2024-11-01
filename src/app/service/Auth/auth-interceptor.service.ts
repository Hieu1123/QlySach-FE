import { AuthService } from './auth-service.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService : AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  this.authService.getToken();
    const cloneRequest = token
      ?req.clone({headers : req.headers.set('Authorization', `Bearer ${token}`)})
      : req
    return next.handle(req);
  }
}
