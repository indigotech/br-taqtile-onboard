import { Injectable } from "@angular/core";
import { UserLoginResponse } from "./response/UserLoginResponse";
import { UserLoginErrorResponse } from "./response/UserLoginResponseError";
import { HttpClient } from "@angular/common/http";

const LOGIN_URL = "https://tq-template-server-sample.herokuapp.com/authenticate";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private httpClient: HttpClient){

    }

    login(body) {
        return this.httpClient.post<UserLoginResponse>(LOGIN_URL, body);
    }
}