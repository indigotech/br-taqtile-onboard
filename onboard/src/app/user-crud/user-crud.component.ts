import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../../api/UserService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Globals } from '../globals';
import { UserAdd } from '../../api/response/UserAdd';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {
  user: any = {};

  private loadingUserInfo: boolean;
  private isEditing: boolean;
  private emailControl = new FormControl('', [Validators.required, Validators.email]);
  private roleControl =  new FormControl();
  private hidePassword = true;
  private isAddingUser = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.user.id = new Number(this.route.snapshot.paramMap.get(this.globals.userIdParamKey)).valueOf();
    this.isEditing = this.user.id > 0;

    if (this.isEditing) {
      this.loadUserInfo();
      this.emailControl.disable();
      this.roleControl.disable();
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
    this.backToUserList();
  }

  addUser() {
    this.isAddingUser = true;
    console.log("User", this.user);
    
    this.userService.add(this.user).subscribe(
      response => { this.onAddUserSuccess(response);  },
      error => { this.onAddUserError(error); }
    )
  }

  onAddUserSuccess(response) {
    this.isAddingUser = false;
    this.snackBar.open("Usuário adicionado :)", null, { duration: this.globals.snackbarDuration }); 
    this.backToUserList();
  }

  onAddUserError(error) {
    console.log(error);
    
    this.isAddingUser = false;
    this.snackBar.open("Não foi possivel adicionar o usuário", null, { duration: this.globals.snackbarDuration });
  }

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
