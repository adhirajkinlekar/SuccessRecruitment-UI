import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      
    let token = localStorage.getItem('JWT_TOKEN');
        let modifiedRequest = request.clone({
            setHeaders:{
               'Authorization':token != null ? token : ''
            }
        })
        return next.handle(modifiedRequest);
  }
}
