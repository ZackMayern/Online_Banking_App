import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const router = inject(Router);
  const tokenStorage = AuthService.prototype.getToken();
  
  if (AuthService.prototype.isLoggedIn()) {
    return true;
  }
  else {
    alert("Please login first!");
    router.navigate(['login']);
    return false;
  }
}
