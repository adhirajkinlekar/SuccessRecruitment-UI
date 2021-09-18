import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
const routes: Routes = [{
  path:'',component:HomeComponent,resolve:{
    Pages:HomeResolver
  },children: [
    { 
      path: 'Job',loadChildren: ()=>  import('./job/job.module').then((m)=> m.JobModule)
    },
    {
      path:'unauthorized',component:UnauthorizedComponent,data:{ message:'not authorized' }
  }  
  ]
} 
// ,
// { path: '**', redirectTo: '/' }
];

//wildcard route has to always be last in the array
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { 
}
// Uncaught (in promise): Error: RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.
// Error: RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.

// While lazy loading modules inside another module use forChild(routes) in routing module. forRoot(route) is for appModule