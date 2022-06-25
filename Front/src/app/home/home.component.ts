import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //content?: string;
  isLoggedIn = this.tokenStorageService.getToken()?true:false;

  constructor(private userService: UserService, private tokenStorageService : TokenStorageService,private authService : AuthService, private router : Router) { }

   ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      (data)=>{
        this.isLoggedIn = data;
      }


          );
   }

   nouvelleReservation():void{
    this.router.navigateByUrl('/main/nouvelleReservation')
   }


}
