import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/UserService';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: Array<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUserList();
  }

  loadUserList() {
    this.userService.getUserList().subscribe(
      response => { this.userList = response.data; console.log(this.userList); },
      error => { console.log(error); } //TODO
    );
  }
}
