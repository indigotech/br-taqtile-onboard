import { Injectable } from "@angular/core";
import { UserLoginResponse } from "./response/UserLoginResponse";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../app/globals";
import { Observable } from "rxjs";
import { UserLogin } from "./response/UserLogin";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLoggedIn: boolean = false;
    private readonly loginUrl: string;

    constructor(private httpClient: HttpClient, private globals: Globals, private router: Router) {
        this.loginUrl = globals.apiUrl + globals.authenticateUrl;
    }

    loginAsync(body) {
        return this.httpClient.post<UserLoginResponse>(this.loginUrl, body).pipe(
            map(response => response.data)
        );
    }

    refreshSessionAsync() {
        let localUser: UserLogin = JSON.parse(this.getLocalUser());
        this.clearUserSession();
        if (localUser == null) {
            this.isLoggedIn = false;
            this.router.navigateByUrl(this.globals.loginUrl);
        }
        else {
            this.loginAsync(localUser).subscribe(
                response => { this.isLoggedIn = true; },
                error => {
                    this.isLoggedIn = false;
                    this.clearUserSession();
                    this.router.navigateByUrl(this.globals.loginUrl);
                }
            );
        }
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
}