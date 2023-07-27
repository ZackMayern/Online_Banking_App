import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm: FormGroup;

  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router){
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      panNumber: ['', Validators.required]
    })
  }
  // For showing/hiding the eye icon in the password input
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  // For validation of the form
  onOrder(){
    if(this.signupForm.valid){
      //Send the object to DB
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(res=>{ 
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
          }),
        error:(err=>{ 
          alert(err?.error.message) 
        })
      })
    }
    else{
      // Throw error
      ValidateForm.validateAllFormFields(this.signupForm);
      alert("Your Form is invalid!");
    }
  }
}
