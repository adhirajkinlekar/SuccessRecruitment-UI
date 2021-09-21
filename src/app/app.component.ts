import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuccessRecruitment'
  constructor(public service:AppService){

  }
  onOutletLoadedOrDestroyed(event){
    //A router outlet emits an activate event when a new component is instantiated, and a deactivate event when a component is destroyed.
  }
}
