import { Component, OnInit,ElementRef,QueryList,ViewChildren, ViewChild,ViewContainerRef, TemplateRef, Output, HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AppService } from '../app.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChildren("container") private Container: ViewContainerRef; 
  // @ViewChild("Items") private Items: TemplateRef<any>; 
  @ViewChild('hamburger', { read: ElementRef, static:false }) hamburger: ElementRef; 
  @ViewChild('sideBar', { read: ElementRef, static:false }) sideBar: ElementRef; 
  @ViewChildren("Menu") private Menu: QueryList<ElementRef>; // For list of elements  
  // @Output() user = new EventEmitter();
  // @Output() user = new EventEmitter<{name:string,roles:string}>();
  //@ViewChild("Menu",{static: true}) private menu2: ElementRef; // For list of elements 
  //  { static: true } as a second argument needs to be applied to ALL usages of @ViewChild() (and also @ContentChild() 
 //if you plan on accessing the selected element inside of ngOnInit().
// If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!
  screenWidth: any;  
  screenHeight: any;  
  userName:string;
  userRoles:string;
  tabs = [];
  constructor(private route: ActivatedRoute,public service:HomeService,public appService:AppService, private router: Router) {}




  ngOnInit(): void {
    this.screenWidth = window.innerWidth;  
    console.log(this.screenWidth)
    this.screenHeight = window.innerHeight;  
   this.userName = localStorage.getItem('USER_NAME');
   this.userRoles = localStorage.getItem('USER_ROLES')
  //  this.user.emit({
  //   name:this.userName,
  //   roles:this.userRoles
  // })
  let pages = this.route.snapshot.data.Pages;
  if(pages){
    this.setPages(pages);
  }
  }

  setPages(pages){
    pages.tabs.$values.forEach((tabPage,i) => {
      this.tabs.push({
        pageId:tabPage.pageId,
        pageName:tabPage.pageName,
        pageLink:tabPage.pageLink,
        parentPageId:tabPage.parentPageId,
        subPages:[]
      })
     });

     this.tabs.forEach((tabPage,i) => {
      pages.subPages.$values.forEach((subPage,i) => {
        if(subPage.parentPageId == tabPage.pageId){

          tabPage.subPages.push({
            pageId:subPage.pageId,
            pageName:subPage.pageName,
            pageLink:subPage.pageLink,
            parentPageId:subPage.parentPageId,
            childPages:[]
          })
      }
      })

      tabPage.subPages.forEach(subPage => {
        pages.childPages.$values.forEach(childPage => {
          if(childPage.parentPageId == subPage.pageId){
           subPage.childPages.push({
             pageId:childPage.pageId,
             pageName:childPage.pageName,
             pageLink:childPage.pageLink,
             parentPageId:childPage.parentPageId
           })
          }
        });
    
      });
    }); 
  }
           
  ngAfterViewInit(){
  //  console.log(this.Container)
  //  console.log(this.Items)
  }

  // @HostListener('mouseenter') mouseover(event:Event){
  //   //added for learning purposes only. A better or actual use for this would be by creating a directive and then using the hostlistener inside it since we get the elements reference
  // }

  expandMenu($event,i) {
    this.Menu.toArray().forEach((ele,i)=>{
      if(ele.nativeElement.id == $event.srcElement.innerText){
        if(ele.nativeElement.classList.contains('hidesubmenu')){
          
          ele.nativeElement.classList.remove('hidesubmenu')
        }
        else{
          ele.nativeElement.classList.add('hidesubmenu')
        }
      }
    })
    
  }
        
  signOut(){
    Swal.fire({
      title: 'Are you sure you want to sign out?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('JWT_TOKEN')
        this.appService.isAuthenticated.next(false);
        this.router.navigateByUrl('/signin');
        this.tabs = [];
      } 
    })
  
  }


  showQueryParams(page){
    if(page === 'Job/AddJob'){
      return {isEdit:false}
    }
  }

  hideNavbar(){
    if(window.innerWidth<768){
      if(this.hamburger.nativeElement.classList.contains('open')){
        this.hamburger.nativeElement.classList.remove('open')
        this.sideBar.nativeElement.classList.add('show-sidebar-wrapper')
      }
      else{
        this.hamburger.nativeElement.classList.add('open')
        this.sideBar.nativeElement.classList.remove('show-sidebar-wrapper')
      }
    }
  }
}
