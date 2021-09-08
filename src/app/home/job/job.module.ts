import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditJobComponent } from './AddEditJobs/AddEditJob.component';
import { JobRoutingModule } from './job-routing.module';
import { ViewjobsComponent } from './viewjobs/viewjobs.component';

@NgModule({
  declarations: [AddEditJobComponent, ViewjobsComponent],
  imports: [
    CommonModule,
    JobRoutingModule
  ]
})
export class JobModule { }
