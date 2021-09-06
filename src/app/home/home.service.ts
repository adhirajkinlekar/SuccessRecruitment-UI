import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'https://localhost:44308/home';
  constructor(private http:HttpClient) { }
  tabs = [];
  getAppInformation(){
   this.http.get<any>(`${this.baseUrl}`).subscribe(
     data=>{
       data.tabs.$values.forEach((tabPage,i) => {
        this.tabs.push({
          pageId:tabPage.pageId,
          pageName:tabPage.pageName,
          parentPageId:tabPage.parentPageId,
          subPages:[]
        })
       });

       this.tabs.forEach((tabPage,i) => {
        data.subPages.$values.forEach((subPage,i) => {
          if(subPage.parentPageId == tabPage.pageId){

            tabPage.subPages.push({
              pageId:subPage.pageId,
              pageName:subPage.pageName,
              parentPageId:subPage.parentPageId,
              childPages:[]
            })
        }
        })

        tabPage.subPages.forEach(subPage => {
          data.childPages.$values.forEach(childPage => {
            if(childPage.parentPageId == subPage.pageId){
             subPage.childPages.push({
               pageId:childPage.pageId,
               pageName:childPage.pageName,
               parentPageId:childPage.parentPageId
             })
            }
          });
      
        });
      });
      console.log(this.tabs)
     },
     err=>{
       console.log(err)
     }
   )
  }
}



