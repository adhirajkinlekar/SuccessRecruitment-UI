import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = 'https://localhost:44308/Job'
  testEvent = new EventEmitter<string>();
    constructor(private http:HttpClient){}


    getRecuiters(){
      //this.testEvent.emit('Getting Recruiters');
      return this.http.get(`${this.baseUrl}/Recuiters`)
    }
    postJob(jobDetails){
      return this.http.post(`${this.baseUrl}/PublishJob`,jobDetails) // passing jobDetails as {jobDetails} will send an empty dto to the server
    }
    getAllJobs(){
      return this.http.get(`${this.baseUrl}/AllJobs`,{
        responseType:'json' //we can also set the response type to text/blob etc
      }
      // ,{
      //   observe:'response'
      // }
      )
    }
    getJobById(jobId){
      // var params = new HttpParams();
      // params = params.append('testValue1', '1');
      // params = params.append('testValue2', '2');
      // return this.http.get(`${this.baseUrl}/${jobId}`,{
      //   params:  params})

      return this.http.get(`${this.baseUrl}/${jobId}`)
    }
    updateJob(jobDetails){ 
      return this.http.put(`${this.baseUrl}/UpdateJob`,jobDetails 
      ,{
          observe:'response'
        })
        //observe:'response' will return response details such as status code. we can also have observe:'body',observe:'response' which can give you download or upload progress
    }
}