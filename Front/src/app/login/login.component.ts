import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup( {
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route:Router,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
this.authService.isLoggedIn.next(true);
        this.isLoginFailed = false;

        this.roles = this.tokenStorage.getUser().roles;
        if (this.roles[0]=='ROLE_USER'){
          this.route.navigateByUrl('/main/nouvelleReservation')
        }else if (this.roles[0]=='ROLE_ADMIN'){
          this.route.navigateByUrl('/main/administrerReservation')
        }

      },
      err => {
        let config = new MatSnackBarConfig();
      config.duration = 1500;
      config.panelClass = ['red-snackbar'];
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this._snackBar.open("Le nom d'utiisateur ou le mot de passe est incorrect !",
        '',
        config)
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
