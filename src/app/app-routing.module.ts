import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import {SignInComponent} from './auth/sign-in/sign-in.component'
import {SignInResolver} from './auth/sign-in/Sign-In.resolver'
const routes: Routes = [
  {
    path:'home',
    canLoad:[AuthGuard],
    loadChildren: ()=> import('./home/home.module').then(m=> m.HomeModule)
  },
  {
    path:'', component:SignInComponent,resolve: {
      Data: SignInResolver
    }
   } 
];
//AuthGuard is an array so that we can have multiple guards
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
