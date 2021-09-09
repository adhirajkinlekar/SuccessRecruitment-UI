import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-interceptor.component';
import { HomeModule } from './home/home.module';
import { SignInResolver } from './auth/sign-in/Sign-In.resolver';
import { HomeResolver } from './home/home.resolver';
import { AddEditJobResolver } from './home/job/AddEditJobs/AddEditJob.resolver';
import { ViewJobsResolver } from './home/job/viewjobs/ViewJobs.resolver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    HomeModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:AuthHttpInterceptor,multi:true
  },
SignInResolver,
HomeResolver,
AddEditJobResolver,
ViewJobsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
