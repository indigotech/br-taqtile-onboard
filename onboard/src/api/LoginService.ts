import { Injectable } from "@angular/core";
import { UserLoginResponse } from "./response/UserLoginResponse";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../app/globals";
import { Observable } from "rxjs";
import { UserLogin } from "./response/UserLogin";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLoggedIn: boolean;
    private readonly loginUrl: string;

    constructor(private httpClient: HttpClient, private globals: Globals, private router: Router) {
        this.loginUrl = globals.apiUrl + globals.authenticateUrl;
    }

    login(body) {
        let loginObservable = this.httpClient.post<UserLoginResponse>(this.loginUrl, body);
        return loginObservable;
    }

    getLocalUser() {
        let user = sessionStorage.getItem(this.globals.localUserKey);
        return user != null ? user : localStorage.getItem(this.globals.localUserKey);
    }

    getLocalUserToken() {
        let token = sessionStorage.getItem(this.globals.localUserTokenKey);
        return token != null ? token : localStorage.getItem(this.globals.localUserTokenKey);
    }

    clearUserSession() {
        sessionStorage.clear();
        localStorage.clear();
        localStorage.removeItem(this.globals.localUserKey);
        localStorage.removeItem(this.globals.localUserTokenKey);
    }

    saveUserSession() {
        localStorage.setItem(this.globals.localUserKey, sessionStorage.getItem(this.globals.localUserKey));
        localStorage.setItem(this.globals.localUserTokenKey, sessionStorage.getItem(this.globals.localUserTokenKey));
    }

    refreshSession() {
        let localUser: UserLogin = JSON.parse(this.getLocalUser());
        this.clearUserSession();
        if (localUser == null) {
            this.router.navigateByUrl(this.globals.loginUrl);
        }
        else {
            this.login(localUser).subscribe(
                response => { this.isLoggedIn = true; },
                error => {
                    this.isLoggedIn = false;
                    this.clearUserSession();
                    this.router.navigateByUrl(this.globals.loginUrl);
                }
            );
        }
    }
}