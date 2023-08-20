import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { BookDetail } from './book-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  url:string = environment.apiBaseUrl + '/BookDetails'
  list:BookDetail[] = []
  formData : BookDetail = new BookDetail()
  formSubmitted: boolean = false;
  private userUrl: string = 'http://localhost:5110/api/User';

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
    .subscribe({
      next: res => {
       this.list = res as BookDetail[]
      },
      error: err => {console.log(err)}
    })
  }

  postBookDetail(){
   return this.http.post(this.url, this.formData)
  }
  putBookDetail(){
    return this.http.put(this.url + '/' + this.formData.bookId, this.formData)
   }
   deleteBookDetail(id:number){
    return this.http.delete(this.url + '/' + id)
   }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new BookDetail()
    this.formSubmitted = false;
  }

  getUsers(){
    return this.http.get<any>(this.userUrl);
  }
}
