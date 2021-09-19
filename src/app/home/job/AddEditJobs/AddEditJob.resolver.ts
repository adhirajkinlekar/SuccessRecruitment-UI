import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JobService} from '../Job.service';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import { map ,catchError} from 'rxjs/operators';
import { of } from 'rxjs';
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
        this.service.getRecuiters().pipe(
          catchError((error) => {
            const message = `Retrieval error: ${error}`;
            return of({ recruiters: null, error: message });
          }),
        ),
        this.service.getJobById(jobId).pipe(
          catchError((error) => {
            console.log(error)
            const message = `Retrieval error: ${error}`;
            return of({ formValues: null, error: message });
          }),
        )
      ])
  }
  else{
    return this.service.getRecuiters().pipe(
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        return of({ recruiters: null, error: message });
      }),
    );
  }
  }
 
}

//resolver was throwing error in console and it was making the app to fallback to  rootroute hence had to handle the error here gracefully
