import { Component, OnInit } from '@angular/core';
import { BookDetailService } from '../shared/book-detail.service';
import { BookDetail } from '../shared/book-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styles: [
  ]
})
export class BookDetailsComponent implements OnInit {

  constructor(public service : BookDetailService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.service.refreshList();
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
