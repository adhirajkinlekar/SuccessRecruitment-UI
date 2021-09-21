import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/Utilities/can-deactivate-guard.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewUsersResolver } from './view-users/view-users.resolver';
const routes: Routes = [{
    path : 'AddUser', component: AddEditUserComponent, canDeactivate:[CanDeactivateGuard]
},
{
    path:'ViewUsers', component:ViewUsersComponent,resolve:{users:ViewUsersResolver},canDeactivate:[CanDeactivateGuard]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
}