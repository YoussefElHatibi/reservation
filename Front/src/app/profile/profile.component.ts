import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  role='';

  public changePwdForm = new FormGroup( {
    oldPwd: new FormControl('',Validators.required),
    newPwd: new FormControl('',Validators.required),
    newPwdSecond: new FormControl('',Validators.required)
  });

  constructor(private token: TokenStorageService, private authService:AuthService,private _snackBar: MatSnackBar , private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    for (let elt  of this.currentUser.roles){
      this.role += ', ' + elt=='ROLE_USER'?'Role Utilisateur':(elt=='ROLE_ADMIN'?'Role Administrateur':'Role Modérateur')
    }


    console.log("user is ", this.currentUser)
  }

  modifierPassword(){
    if (this.changePwdForm.value.newPwd != this.changePwdForm.value.newPwdSecond){
      let config = new MatSnackBarConfig();
      config.duration = 1500;
      config.panelClass = ['red-snackbar'];
      this._snackBar.open("Les nouveaux mots de passe doivent etre identiques !",
      '',
      config)
    }else{
      this.authService.changePassword(this.currentUser.username,this.changePwdForm.value.oldPwd,this.changePwdForm.value.newPwd).subscribe(
        data => {
          let config = new MatSnackBarConfig();
        config.duration = 1500;
        config.panelClass = ['green-snackbar'];
          this._snackBar.open("Changement de passe est effectué avec succès ! ",
          '',
          config)

          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

        },
        err => {
        console.log(err)
          let config = new MatSnackBarConfig();
        config.duration = 1500;
        config.panelClass = ['red-snackbar'];
          this._snackBar.open("Erreur de changement de mdp !" + err,
          '',
          config)
        }
      )
    }

  }
}
