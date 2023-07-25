import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm: FormGroup;
  
  constructor(private fb : FormBuilder){
    this.loginForm = this.fb.group({
      custID: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  // For showing/hiding the eye icon in the password input
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  // For validation of the form
  onSubmit(){
    if(this.loginForm.valid){
      //Send the object to DB
      console.log(this.loginForm.value);
    }
    else{
      // Throw error
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your Form is invalid!");
    }
  }
}
