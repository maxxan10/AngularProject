import { Component, OnInit } from '@angular/core';
import { BookDetailService } from '../shared/book-detail.service';
import { BookDetail } from '../shared/book-detail.model';
import { ToastrService } from 'ngx-toastr';
import { HomepageComponent } from '../home/homepage/homepage.component';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user-store.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: [ './book-details.component.css',
  ]
})

export class BookDetailsComponent implements OnInit {

  //Onödig Duplicering av Kod
  public role!:string;

  public name : string = "";
  constructor(public service : BookDetailService, private toastr: ToastrService, private auth : AuthService, private userStore: UserStoreService) {

  }
  ngOnInit(): void {
    this.service.refreshList();


      //Onödig Duplicering av Kod, kan kalla fram koden istället
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
  }
  populateForm(selectedRecord:BookDetail) {
    this.service.formData = Object.assign({},selectedRecord);
  }


  onDelete(id:number) {
    if(confirm('Are you sure you want to delete this?'))
    this.service.deleteBookDetail(id)
    .subscribe({
      next: res => {
        this.service.list = res as BookDetail[]
        this.toastr.error('Deleted Successfully', 'Book Detail Register')
      },
      error: err => {
        console.log(err);
        
      }
     })
  }
}
