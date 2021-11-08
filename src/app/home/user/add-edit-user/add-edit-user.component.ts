import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  error: string;
  success: string;
  roles = [];
  isUpdate = false;
  pages = [];
  @ViewChild('multiple', { read: ElementRef, static: false }) multiple: ElementRef;
  addUserForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl([], [Validators.required]),
    phone: new FormControl(''),
    roleIds: new FormControl([], Validators.required)
  }, { validators: [this.selectValidator()] })

  pageForm: FormGroup;
  constructor(private route: ActivatedRoute, private service: UserService, private fb: FormBuilder) {
    this.pageForm = this.fb.group({
      checkArray: this.fb.array([])
    })
    this.roles = this.route.snapshot.data.roles[0].$values;

    if (this.route.snapshot.paramMap.get('id')) {
      this.isUpdate = true;
      this.setFormValues();
      this.setPagesAccess(this.route.snapshot.data.roles[2]?.$values);
    }

  }

  setPagesAccess(pageData) {
    let tabs = pageData?.filter(x => x.isTab === true)

    tabs?.forEach(tab => {
      this.pages.push({
        tab: tab,
        pages: pageData?.filter(x => x.tabId === tab.pageId)
      })
    });
    pageData.forEach(page => {

      const checkArray: FormArray = this.pageForm.get('checkArray') as FormArray;
      if (page.isAccessible) {
        checkArray.push(new FormControl({
          pageId: page.pageId,
          isAccessible: true
        }));
      }
      else {
        checkArray.push(new FormControl({
          pageId: page.pageId,
          isAccessible: false
        }));
      }

    })
  }

  ngOnInit(): void {
    this.addUserForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.error = null;
      }
    })
  }

  setFormValues() {
    let formValues = this.route.snapshot.data.roles[1];
    this.addUserForm.patchValue({
      userName: formValues?.userName,
      email: formValues?.email,
      phone: isNaN(formValues?.phone) ? null : formValues?.phone,
      roleIds: formValues?.roleIds?.$values
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

  onCheckboxChange(e, id) {
    const checkArray: FormArray = this.pageForm.get('checkArray') as FormArray;

    checkArray.controls.forEach((item: FormControl, i) => {
      if (item.value.pageId == id) {
        console.log(checkArray.at(i))
        checkArray.at(i).patchValue({
          pageId: item.value.pageId,
          isAccessible: !item.value.isAccessible
        }
        )
        return;
      }
    });
    console.log(this.pageForm.value)
  }

  submitForm() {
    this.error = null;
    this.success = null;
    for (let c in this.addUserForm.controls) {
      this.addUserForm.controls[c].markAsTouched();
    }
    if (!this.addUserForm.valid) {
      this.error = "Please fill all required fields";
      return;
    }

    if (this.isUpdate) {
      let updatedUserDto = Object.assign(this.addUserForm.value, { UserId: this.route.snapshot.paramMap.get('id') })
      this.service.updateUser(updatedUserDto).subscribe(
        data => {
          if (data) {
            this.success = "User has been successfully updated";
          }
        },
        error => {
          this.error = error.error;
        })
    }
    else {
      this.service.addUser(this.addUserForm.value).subscribe(
        data => {
          if (data) {
            this.addUserForm.reset();
            this.success = "User has been successfully added in the system. By default 1234 is assigned as user's password. This can be changed by the user on the login screen.(Feature not added yet). By default a new user is not given access to editable pages unless their role is Admin or General Manager. This can be changed on the edit page (Feature not added)";
          }
        },
        error => {
          this.error = error.error;
        })
    }

  }

  submitPageForm() {
    let userId = this.route.snapshot.paramMap.get('id');
    this.service.updateUserPages(userId, this.pageForm.value.checkArray).subscribe(
      data => {
        this.service.getUserPages(userId).subscribe(
          data=>{
            this.setPagesAccess(userId)
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }

}
