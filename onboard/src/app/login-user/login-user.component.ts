import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../api/LoginService';

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
  rememberMe = false;
  user = { 
    email: "",
    password: "",
    rememberMe: this.rememberMe
  };

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  getEmailErrorMsg() {
    return this.emailControl.hasError('required') ? 'Digite seu e-mail' :
        this.emailControl.hasError('email') ? 'E-mail inválido' :
            '';
  }

  getPasswordErrorMsg() {
    return this.passwordControl.hasError('required') ? 'Digite sua senha' : '';
  }

  onBtnLoginClick() {
    this.emailError = this.emailControl.invalid;
    this.passwordError = this.passwordControl.invalid;

    if (this.emailError || this.passwordError) {
      this.loggingIn = false;
      return;
    }
    
    this.loggingIn = true;
    this.loginService.onLoginComplete = () => { this.loggingIn = false; }
    this.loginService.login(this.user);
  }
}
