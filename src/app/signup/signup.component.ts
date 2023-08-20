import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css'],
})

export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService,

   
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

 
 // onSignUp(){
 //   this.auth.signUp(this.signupObj).subscribe({
 //     next:(res=>{
 //       alert(res.message)
 //     }),
 //     error:(err=>{
 //       alert(err?.error.message)
 //     })
 //   })
//
 // }
  onSubmit(){

    let signUpObj = {
      ...this.signUpForm.value,
      role:'',
      token:''
    }
      this.auth.signUp(signUpObj)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(['user-login-component']);
          this.toast.success('Registration Successful!')
        }),
        error:(err=>{
          //this.toast.error('Something went wrong!')
          alert(err.message);
        })
      })
    }
    
}
