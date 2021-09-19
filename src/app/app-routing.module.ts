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
   },
   { path: '**', redirectTo: '/not-found' }
   //point to note- adding wildcard route in home module makes the app sent requests to the server forever. need to research about this.It is quite possible that wildcard route not
   //only has to be the last in the array but also last in the rootmodule route array
];
//AuthGuard is an array so that we can have multiple guards
@NgModule({
   //imports: [RouterModule.forRoot(routes,{useHash:true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
