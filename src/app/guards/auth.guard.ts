import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth: AuthService = inject(AuthService);
  const toast: ToastrService = inject(ToastrService);
  if(auth.isLoggedIn()){
    return true;
  } else {
    toast.error('Please Login First!')
    router.navigate(['user-login-component'])
    return false;
  }
};
