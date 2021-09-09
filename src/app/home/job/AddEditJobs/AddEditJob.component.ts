import { Component, OnInit } from '@angular/core';
import { AddEditJobService } from './AddEditJob.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addEditJob',
  templateUrl: './AddEditJob.component.html',
  styleUrls: ['./AddEditJob.component.css']
})
export class AddEditJobComponent implements OnInit {

  recruiters = [];
  error:string;
  success:string;
  formValue:any;
  isUpdate = false;
  title = 'Add Job';
  buttonText = 'Submit';

  jobForm = new FormGroup({
    EmployerId: new FormControl('',[Validators.required]),
    JobTitle: new FormControl('',[Validators.required]),
    Field: new FormControl('',[Validators.required]),
    JobLocation: new FormControl('',[Validators.required]),
    JobDescription: new FormControl('',[Validators.required])
},{ validators: [this.selectValidator()]})

  constructor(private service: AddEditJobService, private route: ActivatedRoute, public router: Router) {
    this.recruiters = this.route.snapshot.data['Data'].$values; 
    if(this.route.snapshot.paramMap.get('id')){
      this.recruiters = this.route.snapshot.data['Data'][0].$values
     this.formValue = this.route.snapshot.data['Data'][1];
     this.isUpdate = true;
     this.title = 'Edit Job - '+ this.formValue.jobTitle;
     this.buttonText = 'Update'
      this.jobForm.patchValue({
        EmployerId:this.formValue.recruiterId,
        JobTitle:this.formValue.jobTitle,
        Field:this.formValue.field,
        JobLocation:this.formValue.jobLocation,
        JobDescription:this.formValue.jobDescription,
      });
    }
    else{
      this.recruiters = this.route.snapshot.data['Data'].$values; 
    }

  }

  ngOnInit(): void {
  }

  selectValidator() {
   
    return (form: FormGroup): { [key: string]: any } => {
      if (form.controls['EmployerId'].value == '') {
        return { 'length': true };
      }
      return null;
    };
  }
  canDeactivate(url): Observable<boolean> | boolean {
    for (let c in this.jobForm.controls) {
      if(!this.jobForm.controls[c].pristine){
        setTimeout(() => {
          this.showAlert(url);
        });
         return false;
      }
    } 
    return true;
  }   
  showAlert(url){
    Swal.fire({
      title: 'You have unsaved changes. Do you want to continue?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobForm.reset();
        this.router.navigateByUrl(url)
      } 
    })

  }
  
  submitForm(){
    this.error = null;
    this.success = null;
    for (let c in this.jobForm.controls) {
      this.jobForm.controls[c].markAsTouched();
  }

    if(!this.jobForm.valid){
      this.error = "Please fill all required fields";
      return;
    }

    if(this.isUpdate){
      let updateJobDto = this.jobForm.value;
      updateJobDto.jobId = this.formValue.jobId;
       this.service.updateJob(this.jobForm.value).subscribe(
        isUpdated=>{
          if(isUpdated){
            this.success = "Job has been successfully Updated";
          }
        },
        error=>{
        this.error = error.error;
      }
       )
    }
    else{
       this.service.postJob(this.jobForm.value).subscribe(
         isPosted=>{
           if(isPosted){
             this.jobForm.reset();
             this.success = "Job has been successfully published";
           }
         },
         error=>{
         this.error = error.error;
       })
     }
  }
}
