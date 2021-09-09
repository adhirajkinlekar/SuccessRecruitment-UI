import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditJobComponent } from './AddEditJobs/AddEditJob.component';
import { JobRoutingModule } from './job-routing.module';
import { ViewjobsComponent } from './viewjobs/viewjobs.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AddEditJobComponent, ViewjobsComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    ReactiveFormsModule
  ]
})
export class JobModule { }
