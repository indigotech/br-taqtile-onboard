import { Component, OnDestroy, HostListener } from '@angular/core';
import { Globals } from './globals';
import { LoginService } from '../api/LoginService';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  constructor (
    private globals: Globals,
    private loginService: LoginService
  ){ }

  @HostListener("window:beforeunload")
  onClose(){    
    let rememberMe = sessionStorage.getItem(this.globals.rememberMeKey);
    if (rememberMe) {
      this.loginService.saveUserSession();
    }
  }
}
