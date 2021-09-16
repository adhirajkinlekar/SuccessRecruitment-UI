import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private service:AppService,private router:Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
     return this.service.isAuthenticated.pipe(
        tap(authenticated=> {
          if(!authenticated){
            this.router.navigateByUrl('/')
          }
          else{
            return authenticated;
          }
        }
        )
      )
    }
  
}


