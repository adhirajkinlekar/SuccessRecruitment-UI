import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from "@angular/router";

export interface CanComponentDeactivate {
  canDeactivate: (url) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn:'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate, 
  currentRoute: ActivatedRouteSnapshot, 
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot) {
    return component.canDeactivate ? component.canDeactivate(nextState.url) : true;
  }

}