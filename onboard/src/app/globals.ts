import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Globals {
    readonly appName = "Onboard"
    readonly apiUrl = "https://tq-template-server-sample.herokuapp.com";
    readonly snackbarDuration = 1500;
    userRoles = [
        'admin',
        'user'
    ];
    
    //Map Keys
    readonly localUserKey = "localUser";
    readonly localUserTokenKey = "localUserToken";
    readonly userIdParamKey = "userId";

    //URLs
    readonly authenticateUrl = "/authenticate";
    readonly userListUrl = "/users";
    readonly loginUrl = "/";
    readonly addUserUrl = "/users/crud";

}