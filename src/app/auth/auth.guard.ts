import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service:AppService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    //check how to just subscribe to the behaviour subject 
    this.service.checkUserAuthentication().subscribe(
     isAuthenticated=>{
       if(!isAuthenticated){
         return this.router.navigate(['/signin'])
       }
     }
   )
  //  if(unauthorized to perform edit operatins){
  //    return false and show a popup
  //  }
   return true;
  }
}
