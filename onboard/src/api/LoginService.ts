import { Injectable } from "@angular/core";
import { ApiService } from "./ApiService";
import { UserLoginResponse } from "./response/UserLoginResponse";
import { UserLoginErrorResponse } from "./response/UserLoginResponseError";

const LOGIN_URL = "https://tq-template-server-sample.herokuapp.com/authenticate";
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private apiService: ApiService){

    }

    async login(body) {
        await this.apiService.post(
            LOGIN_URL,
            body,
            this.onLoginSuccess,
            this.onLoginError,
            this.onLoginComplete
        )
    }

    onLoginSuccess(response: UserLoginResponse) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("currentUserToken", response.data.token);
        
    }
    
    onLoginError(error: UserLoginErrorResponse) {
    }

    onLoginComplete(){

    }
}