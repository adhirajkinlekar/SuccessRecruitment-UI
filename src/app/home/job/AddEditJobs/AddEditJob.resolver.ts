import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {AddEditJobService} from './AddEditJob.service';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';

@Injectable()
export class AddEditJobResolver implements Resolve<any> {

constructor(private service: AddEditJobService,private router: Router) {}

resolve(route: ActivatedRouteSnapshot) {
  const jobId = route.params['id'];
   
  if(jobId){
      
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
