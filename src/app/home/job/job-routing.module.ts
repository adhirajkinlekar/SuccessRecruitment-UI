import { NgModule } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { AddEditJobComponent } from './AddEditJobs/AddEditJob.component';
import { AddEditJobResolver } from './AddEditJobs/AddEditJob.resolver';
import { ViewjobsComponent } from './viewjobs/viewjobs.component';
import { ViewJobsResolver } from './viewjobs/ViewJobs.resolver';
import {CanDeactivateGuard} from '../../Utilities/can-deactivate-guard.service'

const routes: Routes = [{
    path:'AddJob',component:AddEditJobComponent,
    canDeactivate: [CanDeactivateGuard],resolve:{
      Data:AddEditJobResolver
    }
  },{
    path:'EditJob/:id',component:AddEditJobComponent,
    canDeactivate: [CanDeactivateGuard],resolve:{
      Data:AddEditJobResolver
    }
  },{
    path:'ViewJobs',component:ViewjobsComponent,resolve:{
      Data:ViewJobsResolver
    }
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { 
}
