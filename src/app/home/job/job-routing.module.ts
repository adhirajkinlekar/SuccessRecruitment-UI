import { NgModule } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { AddEditJobComponent } from './AddEditJobs/AddEditJob.component';
import { ViewjobsComponent } from './viewjobs/viewjobs.component';
const routes: Routes = [{
    path:'AddEditJob',component:AddEditJobComponent
  },{
    path:'ViewJobs',component:ViewjobsComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { 
}
