import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceService } from '../account-service.service';
//Login sida med RWT token, local storage ej API & SQL
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'

  ]
})
export class UserLoginComponent implements OnInit {
  signupUsers: any[] = [];
  signupObj: any = {
    username: '',
    email: '',
    password: ''
  };
  loginObj: any = {
    username: '',
    password: ''
  };

  constructor(private accSerivce: AccountServiceService, private route: Router){

  }
  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
    
  }
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers))

  }
  onLogin(){
    debugger
   
    this.accSerivce.onLogin(this.loginObj).subscribe((res:any) => {
      console.log('res' , res);
      localStorage.setItem('token', res.token)
      this.route.navigateByUrl('/book-details ')
    })
  }

}
