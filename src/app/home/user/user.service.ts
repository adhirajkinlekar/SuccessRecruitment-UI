import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private appService:AppService) { }

  getUser(userId){
    return this.http.get<any>(`${this.appService.baseUrl}/user/${userId}`)
  }
  getUsers(){
    return this.http.get<any>(`${this.appService.baseUrl}/user/AllUsers`)
  }
  getRoles(){
    return this.http.get<any>(`${this.appService.baseUrl}/User/Roles`)
}
  addUser(user){
    return this.http.post<any>(`${this.appService.baseUrl}/Auth/Register`,user)
  }

}
