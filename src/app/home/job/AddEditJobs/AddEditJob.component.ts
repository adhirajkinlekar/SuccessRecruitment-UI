import { Component, OnInit } from '@angular/core';
import { AddEditJobService } from './AddEditJob.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addEditJob',
  templateUrl: './AddEditJob.component.html',
  styleUrls: ['./AddEditJob.component.css']
})
export class AddEditJobComponent implements OnInit {

  recruiters = [];
  error:string;
  success:string;
  jobForm = new FormGroup({
    EmployerId: new FormControl('',[Validators.required]),
    JobTitle: new FormControl('',[Validators.required]),
    Field: new FormControl('',[Validators.required]),
    JobLocation: new FormControl('',[Validators.required]),
    JobDescription: new FormControl('',[Validators.required])
},{ validators: [this.selectValidator()]})

  constructor(private service: AddEditJobService, private route: ActivatedRoute) { 
    this.recruiters = this.route.snapshot.data['Data'].$values;
    // this.setFormValue();
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
  // setFormValue(){
  //   this.jobForm.controls['recruiter'].setValue(this.recruiters[0].recruiterId);
  // }
  

  submitForm($event, jobForm){
    this.error = null;
    this.success = null;
    for (let c in this.jobForm.controls) {
      this.jobForm.controls[c].markAsTouched();
  }

    if(!this.jobForm.valid){
      this.error = "Please fill all required fields";
      return;
    }

    this.service.postJob(this.jobForm.value).subscribe(
      isPosted=>{
          if(isPosted){
            this.jobForm.reset();
            this.success = "Job has been successfully published"
          }
      },
      error=>{

      }
    )
    
  }
}
