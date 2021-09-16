import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {Router} from '@angular/router';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn:'root'
})
// if we do not use {providedIn: 'root'} then we would need to import the resolver in the app module.
export class SignInResolver implements Resolve<any> {

constructor(private service: AppService,private router: Router) {}

resolve(route: ActivatedRouteSnapshot) {
   return this.service.checkUserAuthentication().then(
    isAuthenticated=>{
      this.service.isAuthenticated.next(isAuthenticated)
      if(this.service.isAuthenticated.value){
        this.router.navigateByUrl('/home');
      }
    }
  )
  }
}
