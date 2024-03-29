import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../services/user-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})

export class UserLoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService,
    private userStore: UserStoreService

   
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
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
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          let tokenPayload = this.auth.decodedToken();
          this.userStore.setUserNameFromStore(tokenPayload.name);
          this.userStore.setRoleFromStore(tokenPayload.role);
          this.toast.success('Login Successful!')
          this.router.navigate(['book-details-component'])
        },
        error:(err) => {
          console.log(err.message);
          this.toast.error('Incorrect Username or Password')
          console.log(err);
        },
      });
 
      
     
    }
  }
}
