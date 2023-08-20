import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookDetailFormComponent } from './book-details/book-detail-form/book-detail-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { QuoteslistComponent } from './quoteslist/quoteslist.component';
import { TokenInterceptor } from './token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    BookDetailFormComponent,
    UserLoginComponent,
    HomepageComponent,
    SignupComponent,
    DefaultpageComponent,
    QuoteslistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
   
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
