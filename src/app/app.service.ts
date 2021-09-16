import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'https://localhost:44308/Auth';
  isAuthenticated = new BehaviorSubject(false);
  userName:string;
  userRoles:string;
  constructor(private http:HttpClient) { }

  checkUserAuthentication(){
    return this.http.get<any>(`${this.baseUrl}/IsAuthenticated`).toPromise()
  }
}
