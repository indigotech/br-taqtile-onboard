import { Injectable } from "@angular/core";
import { UserLoginResponse } from "./response/UserLoginResponse";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../app/globals";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLoggedIn: boolean;
    private readonly loginUrl: string;

    constructor(private httpClient: HttpClient, private globals: Globals){
        this.loginUrl = globals.apiUrl + "/authenticate";
        this.isLoggedIn = sessionStorage.getItem(this.globals.localUserKey) != null;
    }

    login(body) {
        let loginObservable = this.httpClient.post<UserLoginResponse>(this.loginUrl, body);
        loginObservable.subscribe(
            success => { this.isLoggedIn = true; },
            error => { this.isLoggedIn = false; }
        );
        return loginObservable;
    }

    getLocalUser() {
        return sessionStorage[this.globals.localUserKey];
    }

    getLocalUserToken() {
        return sessionStorage[this.globals.localUserTokenKey];        
    }

    clearUserSession() {
        sessionStorage.clear();
        localStorage.removeItem(this.globals.localUserKey);
        localStorage.removeItem(this.globals.localUserTokenKey);
    }

    saveUserSession() {
        localStorage.setItem(this.globals.localUserKey, sessionStorage.getItem(this.globals.localUserKey));
        localStorage.setItem(this.globals.localUserTokenKey, sessionStorage.getItem(this.globals.localUserTokenKey));
    }
}