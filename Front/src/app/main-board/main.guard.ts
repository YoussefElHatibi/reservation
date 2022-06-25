import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private tokenStorageService : TokenStorageService,private router:Router , private authService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      if(!this.tokenStorageService.getToken()) {
        console.log("fdf")
        this.authService.isLoggedIn.next(false);
        this.router.navigateByUrl('/home')
        return false;
      }


    return true;
  }

}
