import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddEditJobService {

  baseUrl = 'https://localhost:44308/Job'
    constructor(private http:HttpClient){}

    getRecuiters(){
      return this.http.get<any>(`${this.baseUrl}/Recuiters`)
    }

    postJob(jobDetails){
      return this.http.post<any>(`${this.baseUrl}/PublishJob`,jobDetails) // passing jobDetails as {jobDetails} will send an empty dto to the server
    }
}