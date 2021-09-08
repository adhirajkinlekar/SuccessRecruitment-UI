import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {AddEditJobService} from './AddEditJob.service';
import {Router} from '@angular/router';

@Injectable()
export class AddEditJobResolver implements Resolve<any> {

constructor(private service: AddEditJobService,private router: Router) {}

resolve(route: ActivatedRouteSnapshot) {
   return this.service.getRecuiters();
  }
  
}
