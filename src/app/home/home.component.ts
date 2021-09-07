import { Component, OnInit, ViewChild,ElementRef,QueryList,ViewChildren} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild('Menu', { read: ElementRef, static:false }) Menu: ElementRef;
  @ViewChildren("Menu") private Menu: QueryList<ElementRef>;
  isSubmenUexpanded = false;
  constructor(private route: ActivatedRoute,public service:HomeService) { 
  
  }

  ngOnInit(): void {
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
        
}
