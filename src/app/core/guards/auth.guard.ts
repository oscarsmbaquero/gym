import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public usersService: UsersService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    const user = localStorage.getItem('user');

if (user) {
  const tokenObject = JSON.parse(user);
  if (tokenObject && tokenObject.data && tokenObject.data.token) {
    return true;
  }  
}
this.router.navigate(['login']);
return false;
  }
}