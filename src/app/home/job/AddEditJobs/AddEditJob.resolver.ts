import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JobService} from '../Job.service';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
}
)
// if we do not use {providedIn: 'root'} then we would need to import the resolver in the app module

export class AddEditJobResolver implements Resolve<any> {

constructor(private service: JobService,private router: Router) {
}

resolve(route: ActivatedRouteSnapshot) {
  const jobId = route.params['id'];
  if(route.queryParams.isEdit == 'true'){
       return forkJoin([
        this.service.getRecuiters(),
        this.service.getJobById(jobId)
      ]);
  }
  else{
    return this.service.getRecuiters();
  }
  }
 
}
