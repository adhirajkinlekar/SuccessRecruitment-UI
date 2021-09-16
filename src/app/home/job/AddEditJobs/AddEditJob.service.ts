import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddEditJobService {

  baseUrl = 'https://localhost:44308/Job'
    constructor(private http:HttpClient){}

    getRecuiters(){
      return this.http.get(`${this.baseUrl}/Recuiters`)
    }

    postJob(jobDetails){
      return this.http.post(`${this.baseUrl}/PublishJob`,jobDetails) // passing jobDetails as {jobDetails} will send an empty dto to the server
    }
    getAllJobs(){
      return this.http.get(`${this.baseUrl}/AllJobs`)
    }
    getJobById(jobId){
      return this.http.get(`${this.baseUrl}/Job/${jobId}`)
    }
    updateJob(jobDetails){
      return this.http.put(`${this.baseUrl}/UpdateJob`,jobDetails) 
    }
}