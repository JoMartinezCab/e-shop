import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

let router:Router;

export const authGuard: CanActivateFn = (
  route : ActivatedRouteSnapshot,
  state : RouterStateSnapshot
) => {
  /**
   * Se injecta la dependencia
   */
  const authService = inject(AuthService);

  if(!authService.user && !authService.token){
    router.navigate(['auth/login']);
    return false;
  }

  let token = authService.token;
  let expiracion = (JSON.parse(atob(token.split('.')[1]))).exp;

  if(Math.floor((new Date).getTime() / 1000) >= expiracion){
    authService.logout();
    return false;
  }

  return true;
};
