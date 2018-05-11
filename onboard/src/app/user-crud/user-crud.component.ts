import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../../api/UserService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Globals } from '../globals';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  user: User = {} as User;

  private loadingUserInfo: boolean;
  private isEditing: boolean;
  private emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.user.id = new Number(this.route.snapshot.paramMap.get(this.globals.userIdParamKey)).valueOf();
    this.isEditing = this.user.id != null;

    if (this.isEditing) {
      this.loadUserInfo();
    }
  }

  loadUserInfo() {
    this.loadingUserInfo = true;
    this.userService.getUserInfo(this.user.id).subscribe(
      response => { this.onLoadUserInfoSuccess(response) },
      error => { this.onLoadUserInfoError(error); }
    );
  }

  onLoadUserInfoSuccess(response) {
    this.loadingUserInfo = false;
    this.user = response.data; 
  }

  onLoadUserInfoError(error) {
    this.loadingUserInfo = false;
    this.snackBar.open("Não foi possível carregar os dados do usuário", null, {duration: this.globals.snackbarDuration});
    this.router.navigateByUrl(this.globals.userListUrl);
  }

  // addUser() {
  //   this.userService.add(this.user);
  // }

  backToUserList() {
    this.router.navigateByUrl(this.globals.userListUrl);
  }

  getEmailErrorMsg() {
    return this.emailControl.hasError('required') ? 'Digite seu e-mail' :
        this.emailControl.hasError('email') ? 'E-mail inválido' :
        '';
  }

  getOpName() {
    return this.isEditing ? "Detalhes" : "Adicionar Usuário";
  }
}
