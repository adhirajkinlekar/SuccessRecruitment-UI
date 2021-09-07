import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
const routes: Routes = [{
  path:'home',component:HomeComponent,resolve:{
    Data:HomeResolver
  }
},{
  path:'AddEditJob',loadChildren: ()=>  import('./job/job.module').then((m)=> m.JobModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
