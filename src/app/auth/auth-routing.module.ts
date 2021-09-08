import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInResolver } from './sign-in/Sign-In.resolver';

const routes: Routes = [
   {
    path:'', component:SignInComponent,resolve: {
      Data: SignInResolver
    }

   } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
