import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = 'https://localhost:44308/Job'
  testEvent = new EventEmitter<string>();
    constructor(private http:HttpClient,private appService:AppService){}


    getRecuiters(){
      //this.testEvent.emit('Getting Recruiters');
      return this.http.get(`${this.appService.baseUrl}/Job/Recuiters`)
    }
    postJob(jobDetails){
      return this.http.post(`${this.appService.baseUrl}/Job/PublishJob`,jobDetails) // passing jobDetails as {jobDetails} will send an empty dto to the server
    }
    getAllJobs(){
      return this.http.get(`${this.appService.baseUrl}/Job/AllJobs`,{
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

      return this.http.get(`${this.appService.baseUrl}/Job/${jobId}`)
    }
    updateJob(jobDetails){ 
      return this.http.put(`${this.appService.baseUrl}/Job/UpdateJob`,jobDetails 
      ,{
          observe:'response'
        })
        //observe:'response' will return response details such as status code. we can also have observe:'body',observe:'response' which can give you download or upload progress
    }
}