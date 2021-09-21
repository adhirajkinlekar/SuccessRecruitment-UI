import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  constructor(private http:HttpClient,private appService:AppService) { }

  signIn(credentials){
    return this.http.post<any>(`${this.appService.baseUrl}/Auth/login`,credentials)
  }
  
}