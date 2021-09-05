import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  baseUrl = 'https://localhost:44308/Auth';
  isAuthenticated = new BehaviorSubject(false)
  constructor(private http:HttpClient) { }

  signIn(credentials){
    return this.http.post<any>(`${this.baseUrl}/login`,credentials)
  }

  getJobs(){
    return this.http.get<any>('https://localhost:44308/Job/GetJobsByUser')
  }
  checkUserAuthentication(){
    return this.http.get<any>(`${this.baseUrl}/IsAuthenticated`).toPromise()
  }
}