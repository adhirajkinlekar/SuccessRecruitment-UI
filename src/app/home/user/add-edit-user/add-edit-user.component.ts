import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  addUserForm = new FormGroup({
    userName:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phone:new FormControl(''),
    role:new FormControl('')
  })
  constructor(private route:ActivatedRoute) {
   }

  ngOnInit(): void {
  }

}
