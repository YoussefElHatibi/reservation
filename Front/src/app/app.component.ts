import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = this.tokenStorageService.getToken()?true:false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    console.log("is logged in is oninit app:", this.isLoggedIn)

    this.authService.isLoggedIn.subscribe(
(data)=>{
  this.isLoggedIn = data;
}


    );

    // this.isLoggedIn = !!this.tokenStorageService.getToken();
console.log("is loged in is : ",this.isLoggedIn)
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.authService.isLoggedIn.next(false);


  }
}
