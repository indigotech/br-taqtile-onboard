import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/UserService';
import { User } from '../user';
import { LoginService } from '../../api/LoginService';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { UserLogin } from '../../api/response/UserLogin';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private userList: Array<User>;
  private loadingUserList: boolean;

  constructor(
    private userService: UserService, 
    private loginService: LoginService, 
    private router: Router,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.loadUserList();
  }

  loadUserList() {
    this.loadingUserList = true;
    this.userService.getUserList().subscribe(
      response => { this.userList = response.data; this.loadingUserList = false; },
      error => { this.onLoadUserListError(); this.loadingUserList = false; }
    );
  }

  onLoadUserListError() {
    let localUser: UserLogin = this.loginService.getLocalUser();
    if (localUser == null) {
      this.router.navigateByUrl(this.globals.loginUrl);
    }
    else {
      this.loginService.login(localUser).subscribe(
        response => { },
        error => { 
          this.loginService.clearUserSession();
          this.router.navigateByUrl(this.globals.loginUrl); 
        }
      )
    }
  }

  addUser() {
    this.router.navigateByUrl(this.globals.addUserUrl);
  }
}
