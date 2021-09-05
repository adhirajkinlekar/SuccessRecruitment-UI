import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from './sign-in.service';
import {Router} from '@angular/router';

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
 
  constructor(private service:SignInService,private router: Router) {}

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
        console.log(user)
         localStorage.setItem('JWT_TOKEN',`Bearer ${user.token}`);
         this.service.isAuthenticated.next(true);
         this.router.navigateByUrl('/home');
      },
      error=>{
        console.log(error)
          this.error = error.error;
          this.error = "Error occured";
      }
    )
    
  }
}
