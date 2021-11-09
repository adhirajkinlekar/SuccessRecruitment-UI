import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
tabs = [];
  constructor(private http:HttpClient,private appService:AppService) { };
  
  getAppInformation(){
   return this.http.get<any>(`${this.appService.baseUrl}/Home`);
  }

  setPages(pages){
    this.tabs = [];
    pages.tabs.$values.forEach((tabPage, i) => {
      this.tabs.push({
        pageId: tabPage.pageId,
        pageName: tabPage.pageName,
        pageLink: tabPage.pageLink,
        parentPageId: tabPage.parentPageId,
        subPages: []
      })
    });

    this.tabs.forEach((tabPage, i) => {
      pages.subPages.$values.forEach((subPage, i) => {
        if (subPage.parentPageId == tabPage.pageId) {

          tabPage.subPages.push({
            pageId: subPage.pageId,
            pageName: subPage.pageName,
            pageLink: subPage.pageLink,
            parentPageId: subPage.parentPageId,
            childPages: []
          })
        }
      })

      tabPage.subPages.forEach(subPage => {
        pages.childPages.$values.forEach(childPage => {
          if (childPage.parentPageId == subPage.pageId) {
            subPage.childPages.push({
              pageId: childPage.pageId,
              pageName: childPage.pageName,
              pageLink: childPage.pageLink,
              parentPageId: childPage.parentPageId
            })
          }
        });

      });
    });
  }
}



