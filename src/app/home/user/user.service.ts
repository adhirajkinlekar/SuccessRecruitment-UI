import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private appService:AppService) { }

  getUsers(){
    return this.http.get<any>(`${this.appService.baseUrl}/user/AllUsers`)
  }
}
