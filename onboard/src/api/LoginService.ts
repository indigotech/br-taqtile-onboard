import { Injectable } from "@angular/core";
import { UserLoginResponse } from "./response/UserLoginResponse";
import { UserLoginErrorResponse } from "./response/UserLoginResponseError";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../app/globals";


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly LOGIN_URL: string;
    constructor(private httpClient: HttpClient, private globals: Globals){
        this.LOGIN_URL = globals.API_URL + "/authenticate";
    }

    login(body) {
        return this.httpClient.post<UserLoginResponse>(this.LOGIN_URL, body);
    }
}