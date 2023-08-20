import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { BookDetailService } from 'src/app/shared/book-detail.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'
  ]
})

export class HomepageComponent implements OnInit {

  public users:any = [];
  public role!:string;

  public name : string = "";
  loggedin = false;
  constructor(private auth: AuthService, private router: Router, private service: BookDetailService, private userStore: UserStoreService) {

  }
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(){
   this.auth.signOut();
  }

  ngOnInit() {
    this.service.getUsers()
    .subscribe(res=>{
      this.users = res;
    });

    this.userStore.getUserNameFromStore()
    .subscribe(val=>{
      let userNameFromToken = this.auth.getRoleFromToken();
      this.name = val || userNameFromToken
    })
    this.userStore.getRoleFromStore()
    .subscribe(val=> {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
    let token = localStorage.getItem('token');
    if (!token){
      this.loggedin = false;
    } else {
      this.loggedin = true;
    }

  }
  isAuthenticated(){
    this.auth.isLoggedIn();
  }

}


