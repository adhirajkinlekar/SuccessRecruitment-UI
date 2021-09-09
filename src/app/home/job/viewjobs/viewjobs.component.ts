import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-viewjobs',
  templateUrl: './viewjobs.component.html',
  styleUrls: ['./viewjobs.component.css']
})
export class ViewjobsComponent implements OnInit {

  jobs= [];
  constructor( private route: ActivatedRoute,private router:Router) { 
    this.jobs = this.route.snapshot.data['Data'].$values;
  }

  ngOnInit(): void {
  }

}
