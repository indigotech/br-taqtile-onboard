import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Globals {
    readonly appName = "Onboard"
    readonly apiUrl = "https://tq-template-server-sample.herokuapp.com";
    readonly snackbarDuration = 1500;
    
    //Map Keys
    readonly localUserKey = "localUser";
    readonly localUserTokenKey = "localUserToken";
    readonly rememberMeKey = "rememberMe"
    readonly userIdParamKey = "userId";

    //URLs
    readonly userListUrl = "/users"
    readonly loginUrl = "/";

}