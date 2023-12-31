import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

// let router:Router;

export const authGuard: CanActivateFn = (
  route : ActivatedRouteSnapshot,
  state : RouterStateSnapshot
) => {
  /**
   * Se injecta la dependencia
   */
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.user && authService.token){
    const isExpiredToken = authService.expiredToken();

    if(isExpiredToken){
      authService.logout();
      return false;
    }
  }

  return true;
};
