import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
const routes: Routes = [{
  path:'',component:HomeComponent,resolve:{
    Data:HomeResolver
  },children: [
    { 
      path: 'Job',loadChildren: ()=>  import('./job/job.module').then((m)=> m.JobModule)},
  ]
},
{ path: '**', redirectTo: '/home' }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { 
}
