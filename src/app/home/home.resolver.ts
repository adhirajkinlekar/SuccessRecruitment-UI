import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HomeService } from './home.service';
import {Router} from '@angular/router';

@Injectable()
export class HomeResolver implements Resolve<any> {

constructor(private service: HomeService,private router: Router) {}

resolve(route: ActivatedRouteSnapshot) {
   return this.service.getAppInformation();
  }
}
