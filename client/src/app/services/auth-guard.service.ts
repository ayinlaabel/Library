import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (localStorage.getItem('currentUser'))
      return true;
      
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
  }
}