import { Injectable } from "@angular/core";
import { UserLoginResponse } from "./response/UserLoginResponse";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../app/globals";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly loginUrl: string;
    constructor(private httpClient: HttpClient, private globals: Globals){
        this.loginUrl = globals.apiUrl + "/authenticate";
    }

    login(body) {
        return this.httpClient.post<UserLoginResponse>(this.loginUrl, body);
    }

    getLocalUser() {
        return localStorage[this.globals.localUserKey];
    }

    getLocalUserToken() {
        return localStorage[this.globals.localUserTokenKey];        
    }

    isLoggedIn(): boolean {
        console.log("isLoggedIn?", this.getLocalUser() != null);
        return this.getLocalUser() != null;
    }
}