import { NgModule } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { AddEditJobComponent } from './AddEditJobs/AddEditJob.component';
import { AddEditJobResolver } from './AddEditJobs/AddEditJob.resolver';
import { ViewjobsComponent } from './viewjobs/viewjobs.component';
const routes: Routes = [{
    path:'AddJob',component:AddEditJobComponent,resolve:{
      Data:AddEditJobResolver
    }
  },{
    path:'EditJob/:id',component:AddEditJobComponent
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
