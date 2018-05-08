import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  user: User = {} as User;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  hidePassword = true;

  constructor() { }

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
  onLogin() {
    console.log("onLogin");
  }

}
