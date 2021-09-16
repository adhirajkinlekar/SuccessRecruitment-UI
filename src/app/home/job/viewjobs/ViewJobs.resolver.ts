import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {AddEditJobService} from '../AddEditJobs/AddEditJob.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
}
)
// if we do not use {providedIn: 'root'} then we would need to import the resolver in the app module

export class ViewJobsResolver implements Resolve<any> {

constructor(private service: AddEditJobService,private router: Router) {}

resolve(route: ActivatedRouteSnapshot) {
   return this.service.getAllJobs();
  }
  
}