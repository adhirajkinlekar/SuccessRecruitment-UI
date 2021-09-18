import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from './sign-in.service';
import {Router} from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  authForm = new FormGroup({
         email: new FormControl('',[Validators.required]),
         password: new FormControl('',[Validators.required,Validators.minLength(4)])
  })

  error:string;
 //Second parameter can be used to apply validation to the entire formgroup
 
  constructor(private service:SignInService,private appService: AppService,private router: Router) {
    this.appService.checkUserAuthentication();
    if(this.appService.isAuthenticated.value){
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.error = null;

    for (let c in this.authForm.controls) {
      this.authForm.controls[c].markAsTouched();
  }

    if(!this.authForm.valid){
      this.error = "Please fill all fields";
      return null;
    }
    
    let credentials = {
        email: this.authForm.controls.email.value,
        password: this.authForm.controls.password.value
    }

    this.service.signIn(credentials).subscribe(
      user=>{
         localStorage.setItem('JWT_TOKEN',`Bearer ${user.token}`);
         localStorage.setItem('USER_NAME',`${user.userName}`);
         localStorage.setItem('USER_ROLES',`${user.userRoles}`);
         this.appService.isAuthenticated.next(true);
         this.router.navigateByUrl('/');
      },
      error=>{
          this.error = error.error;
      }
    )
    
  }
}
