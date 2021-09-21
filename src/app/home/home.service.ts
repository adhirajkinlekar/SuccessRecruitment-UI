import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'https://localhost:44308/home';
  
  constructor(private http:HttpClient,private appService:AppService) { };
  
  getAppInformation(){
   return this.http.get<any>(`${this.appService.baseUrl}/Home`);
  }
}



