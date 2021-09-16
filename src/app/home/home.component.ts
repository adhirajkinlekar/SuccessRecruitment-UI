import { Component, OnInit,ElementRef,QueryList,ViewChildren} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { SignInService } from '.././auth/sign-in/sign-in.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild('Menu', { read: ElementRef, static:false }) Menu: ElementRef; For signle element
  @ViewChildren("Menu") private Menu: QueryList<ElementRef>; // For list of elements
  userName:string;
  userRoles:string;

  constructor(private route: ActivatedRoute,public service:HomeService,public appService:AppService, private router: Router) { 
    
  }

  ngOnInit(): void {
   this.userName = localStorage.getItem('USER_NAME');
   this.userRoles = localStorage.getItem('USER_ROLES')
  }

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
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('JWT_TOKEN')
        this.appService.isAuthenticated.next(false);
        this.router.navigateByUrl('/');
        this.service.tabs = [];
      } 
    })
  
  }
}
