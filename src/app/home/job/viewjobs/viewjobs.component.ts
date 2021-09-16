import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewjobs',
  templateUrl: './viewjobs.component.html',
  styleUrls: ['./viewjobs.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ViewjobsComponent implements OnInit {

  jobs = [];
  selectedJob:any;
  filteredJobs = [];
  constructor( private route: ActivatedRoute,private router:Router,config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    this.jobs = this.route.snapshot.data['Data'].$values;
    this.filterJobs('');
  }

  ngOnInit(): void {
  }

  filterJobs(value){
    this.filteredJobs = this.jobs.filter((job)=>{
      return job.jobTitle.toLowerCase().includes(value.toLowerCase()) ||
      job.recruiterName.toLowerCase().includes(value.toLowerCase()) || 
      job.field.toLowerCase().includes(value.toLowerCase()) || 
      job.jobLocation.toLowerCase().includes(value.toLowerCase())
    })
  }
  open(content,job) {
    this.selectedJob = job
    this.modalService.open(content);
  }

}
