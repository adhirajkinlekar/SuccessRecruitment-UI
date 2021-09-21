import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserRoutingModule } from './user-routing.module';
import { ViewUsersComponent } from './view-users/view-users.component';



@NgModule({
  declarations: [ AddEditUserComponent, ViewUsersComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
