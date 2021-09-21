import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient,private appService:AppService) { };
  
  getAppInformation(){
   return this.http.get<any>(`${this.appService.baseUrl}/Home`);
  }
}



