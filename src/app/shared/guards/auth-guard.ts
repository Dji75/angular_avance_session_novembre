import { CanActivateFn, Router } from '@angular/router';
import { AuthApi } from '../services/auth.api';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authApi = inject(AuthApi);
  const router = inject(Router);

  if (authApi.isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/']);
};
