import { Component, HostListener, OnInit } from '@angular/core';
import { JobService } from '../Job.service';
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

  jobForm = new FormGroup({
    EmployerId: new FormControl('',[Validators.required]),
    JobTitle: new FormControl('',[Validators.required]),
    Field: new FormControl('',[Validators.required]),
    JobLocation: new FormControl('',[Validators.required]),
    JobDescription: new FormControl(''),
    // testFormGroup: new FormGroup({
    //   testname: new FormControl('')
    // })
    // It is also possible to have nested form groups. This group has to specified in the template using 'formGroupName="testFormGroup"'
},{ validators: [this.selectValidator()]})

//this is currently listening to browser events such as user manually entering a url or closing a tab
  @HostListener('window:beforeunload',['$events']) unloadNotification($event){
    if(!this.jobForm.pristine){
       $event.returnValue == true;
    }
  }
  constructor(private service: JobService, private route: ActivatedRoute, public router: Router) {
    this.setFormValues();
  }

  ngOnInit(): void {
    // following highlighted code is unrelated and just placed here to show the funtioning of valuechanges and status changes
    // this.jobForm.valueChanges.subscribe(data=>{
    // })
    this.jobForm.statusChanges.subscribe(status=>{
      if(status === 'VALID'){
        this.error = null;
      }
    })
  }
  showPage(){
    if((this.isUpdate) && (this.route.snapshot.data['Data'][1].error)){
    return false;
    }

    return true;
  }

  setFormValues(){
    if(this.route.snapshot.paramMap.get('id')){
      this.recruiters = this.route.snapshot.data['Data'][0].$values
      this.formValue = this.route.snapshot.data['Data'][1];
      this.isUpdate = true;
      this.jobForm.patchValue({
        EmployerId:this.formValue?.recruiterId,
        JobTitle:this.formValue?.jobTitle,
        Field:this.formValue?.field,
        JobLocation:this.formValue?.jobLocation,
        JobDescription:this.formValue?.jobDescription,
      });
    }
    else{
      this.recruiters = this.route.snapshot.data['Data'].$values; 
    }
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
      let updateJobDto = Object.assign(this.jobForm.value,{jobId:this.formValue.jobId})
       this.service.updateJob(updateJobDto).subscribe(
        data=>{
          if(data.body){
            this.success = "Job has been successfully Updated";
            for (let c in this.jobForm.controls) {
              this.jobForm.controls[c].markAsPristine();
          }
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
             this.success = "Job has been successfully published on the website";
           }
         },
         error=>{
         this.error = error.error;
       })
     }
  }

 
}
