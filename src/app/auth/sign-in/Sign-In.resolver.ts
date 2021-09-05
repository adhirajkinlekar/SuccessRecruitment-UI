import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SignInService } from './sign-in.service';
import {Router} from '@angular/router';

@Injectable()
export class SignInResolver implements Resolve<any> {

constructor(private service: SignInService,private router: Router) {}

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
