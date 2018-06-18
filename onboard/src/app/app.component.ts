import { Component } from '@angular/core';
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
}
