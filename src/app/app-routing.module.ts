import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SignupComponent } from './signup/signup.component';
import { DefaultpageComponent } from './defaultpage/defaultpage.component';
import { QuoteslistComponent } from './quoteslist/quoteslist.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: DefaultpageComponent, pathMatch:'full' },
  { path: 'book-details-component', component: BookDetailsComponent, canActivate: [authGuard] },
  { path: 'user-login-component', component: UserLoginComponent },
  { path: 'user-signup-component', component: SignupComponent },
  { path: 'quotes', component: QuoteslistComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
