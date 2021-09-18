import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import {SignInComponent} from './auth/sign-in/sign-in.component';
//Check if it would be better to have home module load eagerly
const routes: Routes = [
  {
    path:'',
    canActivate:[AuthGuard],
    loadChildren: ()=> import('./home/home.module').then(m=> m.HomeModule)
  },
  {
    path:'signin', component:SignInComponent
   }
];
//AuthGuard is an array so that we can have multiple guards
@NgModule({
   //imports: [RouterModule.forRoot(routes,{useHash:true})],
  imports: [RouterModule.forRoot(routes)],
  providers:[AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
