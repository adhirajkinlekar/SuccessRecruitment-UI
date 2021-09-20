import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
//  baseUrl = 'https://localhost:44308/Auth';
 // baseUrl = 'http://successrecruitment.somee.com/Auth';
  constructor(private http:HttpClient,private appService:AppService) { }

  signIn(credentials){
    return this.http.post<any>(`${this.appService}/login`,credentials)
  }

  getJobs(){
    return this.http.get(`${this.appService}/Job/GetJobsByUser`)
  }
  
}