import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../api/LoginService';
import { MatSnackBar } from '@angular/material'
import { UserLoginErrorResponse } from '../../api/response/UserLoginResponseError';
import { UserLoginResponse } from '../../api/response/UserLoginResponse';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { UserLogin } from '../../api/response/UserLogin';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  emailError = false;
  passwordError = false;
  loggingIn = false;
  hidePassword = true;
  user: UserLogin = {} as UserLogin;

  constructor(
    private loginService: LoginService, 
    private snackBar: MatSnackBar,
    private globals: Globals,
    private router: Router
  ) { 
    this.user.rememberMe = false;
  }

  ngOnInit() {
    if (this.loginService.isLoggedIn){
      this.router.navigateByUrl(this.globals.userListUrl)
    }
  }

  getEmailErrorMsg() {
    return this.emailControl.hasError('required') ? 'Digite seu e-mail' :
        this.emailControl.hasError('email') ? 'E-mail inválido' :
        '';
  }

  getPasswordErrorMsg() {
    return this.passwordControl.hasError('required') ? 'Digite sua senha' : '';
  }

  login() {
    this.emailError = this.emailControl.invalid;
    this.passwordError = this.passwordControl.invalid;

    if (this.emailError || this.passwordError) {
      this.loggingIn = false;
      return;
    }
    
    this.loggingIn = true;
    this.loginService.login(this.user).subscribe(
      response => { this.onLoginSuccess(response) },
      error => { this.onLoginError(error) }
    );
  }

  onLoginSuccess(response: UserLoginResponse) {
    sessionStorage.setItem(this.globals.localUserKey, JSON.stringify(response.data.user));
    sessionStorage.setItem(this.globals.localUserTokenKey, response.data.token);
    if (this.user.rememberMe) {
      this.loginService.saveUserSession();
    }        
    this.router.navigateByUrl(this.globals.userListUrl);
  }

  onLoginError(errorResponse) {
    this.snackBar.open(errorResponse.error.errors[0].message, null, {duration: this.globals.snackbarDuration});
    this.loggingIn = false;    
  }
}
