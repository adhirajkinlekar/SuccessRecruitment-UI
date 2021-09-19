import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import { NotfoundComponent } from './notfound/notfound.component'

@NgModule({
  declarations: [HomeComponent, NotfoundComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
//  wherever we import the shared module we have access to all the components, directives etc. that are exported. If we export the common module we do not even
//   need to import the common moudle inside the module that we are importing the shared module

//A big point to note is that we can import in as many modules as we want but we can only decalare in components in one module
