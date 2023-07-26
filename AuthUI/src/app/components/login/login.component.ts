import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm: FormGroup;
  
  constructor(private fb : FormBuilder, 
    private auth: AuthService, 
    private router : Router){
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
  onLogin(){
    if(this.loginForm.valid){
      //Send the object to DB
      this.auth.login(this.loginForm.value).subscribe({
        next:(res=>{ 
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{ 
          alert(err?.error.message) })
      })
    }
    else{
      // Throw error
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your Form is invalid!");
    }
  }
}
