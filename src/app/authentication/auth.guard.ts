import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParseService } from '../parse.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private parseService: ParseService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    if (!this.parseService.isLoogedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
