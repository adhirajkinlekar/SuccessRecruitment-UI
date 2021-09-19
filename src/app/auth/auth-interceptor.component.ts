import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AppService } from '../app.service';
import {Router} from '@angular/router';
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private service:AppService,private router:Router){

  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service.showSpinner.next(true);
    let token = localStorage.getItem('JWT_TOKEN');
        let modifiedRequest = request.clone({
            setHeaders:{
               'Authorization':token != null ? token : ''
            }
        })
        return next.handle(modifiedRequest).pipe(
          
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
             
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              //use switch case here
              if (err.status === 403) {
                this.router.navigate(['/unauthorized'])
              }
            }
          }),
          finalize(()=>{
            this.service.showSpinner.next(false);
          })
          );
  }
}
