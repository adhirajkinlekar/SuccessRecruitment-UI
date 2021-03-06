import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JobService} from '../Job.service';
import {Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
}
)
// if we do not use {providedIn: 'root'} then we would need to import the resolver in the app module

export class ViewJobsResolver implements Resolve<any> {

constructor(private service: JobService,private router: Router) {}

resolve(route: ActivatedRouteSnapshot) {
   return this.service.getAllJobs().pipe(
    catchError((error) => {
      const message = `Retrieval error: ${error}`;
      return of({ jobs: null, error: message });
    }))
}
  
}
