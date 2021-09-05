import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'https://localhost:44308/home';
  constructor(private http:HttpClient) { }

  getAppInformation(){
   this.http.get<any>(`${this.baseUrl}`).subscribe(
     data=>{
       console.log(data)
     },
     err=>{
       console.log(err)
     }
   )
  }
}
