import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, Validator} from '@angular/forms'


//To use dependency injection import Injectable from @angular/core and mark the class as Injectable
@Injectable({providedIn:'root'})
export class MatchPasssword implements Validator{

    //validate(control:AbsttractControl) can be used if you are not sure whether it is a contorl or group
    validate(formGroup: FormGroup): ValidationErrors {
        const {password,passwordConfirmation} = formGroup.value
        if(password == passwordConfirmation){
            return null;
        }
        return {MatchPassswordError:true};
    }
}