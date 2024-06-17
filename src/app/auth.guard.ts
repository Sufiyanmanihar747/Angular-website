import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authServices = inject(AuthService);
  if (authServices.isAuthenticated()) {
    return true
  }
  else {
    router.navigate(['/login'])
    return false;
  }
};
