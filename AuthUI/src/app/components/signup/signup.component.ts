import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm: FormGroup;

  constructor(private fb : FormBuilder){
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      panNumber: ['', Validators.required],
      dob: ['', Validators.required]
    })
  }

  // For showing/hiding the eye icon in the password input

  onOrder(){
    if(this.signupForm.valid){
      //Send the object to DB
      console.log(this.signupForm.value);
    }
    else{
      // Throw error
      ValidateForm.validateAllFormFields(this.signupForm);
      alert("Your Form is invalid!");
    }
  }
}
