import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup( {
    username: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,  private _snackBar: MatSnackBar, private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.authService.register(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        let config = new MatSnackBarConfig();
      config.duration = 1500;
      config.panelClass = ['green-snackbar'];
      this._snackBar.open("Votre compte est créé avec succès !",
        '',
        config)
        this.route.navigateByUrl('/login')
      },
      err => {
        let config = new MatSnackBarConfig();
      config.duration = 1500;
      config.panelClass = ['red-snackbar'];
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this._snackBar.open("Erreur d'inscription !",
        '',
        config)
      }
    );
  }
}
