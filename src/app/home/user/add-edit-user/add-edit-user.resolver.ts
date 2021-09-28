import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
}
)

export class AddEditUserResolver implements Resolve<any> {

constructor(private service: UserService,private router: Router) {}

resolve(route: ActivatedRouteSnapshot) {
   return this.service.getRoles().pipe(
    catchError((error) => {
      const message = `Retrieval error: ${error}`;
      return of({ roles: null, error: message });
    }))
}
  
}
