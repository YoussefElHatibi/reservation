import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService : TokenStorageService,private router:Router , private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      console.log("state url ",state.url)
    if( this.tokenStorageService.getToken() && state.url!='/profile') {
        console.log("fdf2")
        this.authService.isLoggedIn.next(true);
        this.router.navigateByUrl('/home')
        return false;
      }

      if (!this.tokenStorageService.getToken() && state.url=='/profile'){
        console.log("not logged and url is profile")
        this.authService.isLoggedIn.next(false);
        this.router.navigateByUrl('/home')
        return false;
      }

      if (state.url=='/home' && this.tokenStorageService.getToken()){
        console.log("authentified and home is url")
        this.authService.isLoggedIn.next(true);
      }

      if (state.url=='/profile' && this.tokenStorageService.getToken()){
        console.log("authentified and profile is url")
        this.authService.isLoggedIn.next(true);
      }

      if (state.url=='/home' && !this.tokenStorageService.getToken()){
        console.log("not authentified and url is home")
        this.authService.isLoggedIn.next(false);
      }

      this.authService.isLoggedIn.next(false);
      return true;

  }

}
