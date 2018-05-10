import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../api/LoginService';
import { Globals } from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private globals: Globals) {

  }

  ngOnInit() {
    this.userLoggedIn = this.loginService.isLoggedIn();
  }

}
