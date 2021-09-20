import { EventEmitter, Injectable,Injector } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AppService {
  //private baseUrl;
  baseUrl:string;
  //baseUrl = 'http://successrecruitment.somee.com/Auth';
  isAuthenticated = new BehaviorSubject(false);
  showSpinner = new BehaviorSubject(false)
  
  constructor(private http:HttpClient,private injector: Injector) { }

  loadAppConfig() {
    console.log(environment.production)
        if(!environment.production){
           this.baseUrl= 'https://successrecruitment.herokuapp.com'
        }
        // else{
        //   this.baseUrl = 'https://localhost:44308'
        // }
  }

  checkUserAuthentication(){
  return this.http.get<any>(`${this.baseUrl}/Auth/IsAuthenticated`).pipe(
    tap((value)=>{
      return this.isAuthenticated.next(value)
    })
  )
  }
}