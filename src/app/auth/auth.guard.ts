import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service:AppService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
   return this.service.checkUserAuthentication().then((value)=>{
    if(!this.service.isAuthenticated.value){
          this.router.navigateByUrl('/signin');
        }
        return true;
   })
  }
}
