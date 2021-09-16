import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  baseUrl = 'https://localhost:44308/Auth';
  constructor(private http:HttpClient) { }

  signIn(credentials){
    return this.http.post<any>(`${this.baseUrl}/login`,credentials)
  }

  getJobs(){
    return this.http.get('https://localhost:44308/Job/GetJobsByUser')
  }
  
}