import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  baseUrl:string;
  isAuthenticated = new BehaviorSubject(false);
  showSpinner = new BehaviorSubject(false)
  
  constructor(private http:HttpClient) { }

  setBaseUrl() {
        if(environment.production){
           this.baseUrl= 'https://successrecruitment.herokuapp.com'
        }
        else{
          this.baseUrl = 'https://localhost:44308'
        }
  }
  setAppHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}

  checkUserAuthentication(){
  return this.http.get<any>(`${this.baseUrl}/Auth/IsAuthenticated`).pipe(
    tap((value)=>{
      return this.isAuthenticated.next(value)
    })
  )
  }
}