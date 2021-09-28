import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserRoutingModule } from './user-routing.module';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ AddEditUserComponent, ViewUsersComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class UserModule { }
