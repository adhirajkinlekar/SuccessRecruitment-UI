import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,APP_INITIALIZER} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-interceptor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';


const appInitializerFn = (service: AppService) => {
  console.log("Initializing");
  return () => {
    return service.loadAppConfig();
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    NgbModule
  ],
  providers: [ {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppService]
  },{
    provide:HTTP_INTERCEPTORS,useClass:AuthHttpInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
