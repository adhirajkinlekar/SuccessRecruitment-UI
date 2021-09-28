import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  error:string;
  success:string;
  roles = [];
  @ViewChild('multiple', { read: ElementRef, static:false }) multiple: ElementRef; 
  addUserForm = new FormGroup({
    userName:new FormControl('',[Validators.required]),
    email:new FormControl([],[Validators.required]),
    phone:new FormControl(''),
    roleIds:new FormControl([],Validators.required)
  },{ validators: [this.selectValidator()]})
  constructor(private route:ActivatedRoute,private service:UserService) {

    this.roles = this.route.snapshot.data.roles.$values;
    // if(this.roles){
    //   this.addUserForm.patchValue({
    //     roleId:[this.roles[0].roleId]
    //   })
    // }
   }

  ngOnInit(): void {
    this.addUserForm.statusChanges.subscribe(status=>{
      if(status === 'VALID'){
        this.error = null;
      }
    })
  }

  selectValidator() {
    return (form: FormGroup): { [key: string]: any } => {
      if (form.controls['roleIds'].value == '') {
        return { 'nullId': true };
      }
      return null;
    };
  }


  submitForm(){
    console.log(this.addUserForm.value)
    this.error = null;
    this.success = null;
    for (let c in this.addUserForm.controls) {
      this.addUserForm.controls[c].markAsTouched();
  }
    if(!this.addUserForm.valid){
      this.error = "Please fill all required fields";
      return;
    }
    this.service.addUser(this.addUserForm.value).subscribe(
      data=>{
        if(data){
          this.addUserForm.reset();
          this.success = "User has been successfully added in the system. By default 1234 is assigned as user's password. This can be changed by the user on the login screen.(Feature not added yet). By default a new user is not given access to editable pages unless their role is Admin or General Manager. This can be changed on the edit page (Feature not added)";
        }
      },
      error=>{
        console.log(error)
      this.error = error.error;
    })
  }

}
