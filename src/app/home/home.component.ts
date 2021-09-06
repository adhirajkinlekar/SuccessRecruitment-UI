import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // data:any;
  // pages = [];
  constructor(private route: ActivatedRoute,private service:HomeService) { 
    // this.data = this.route.snapshot.data['Data'];
  }

  ngOnInit(): void {
  }

}
