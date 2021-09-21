import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
}
)

export class ViewUsersResolver implements Resolve<any> {

constructor(private service: UserService) {}

resolve(route: ActivatedRouteSnapshot) {
   return this.service.getUsers();
  }
}
