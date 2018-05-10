import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Globals {
    readonly appName = "Onboard"
    readonly apiUrl = "https://tq-template-server-sample.herokuapp.com";
    readonly snackbarDuration = 1500;
    readonly localUserKey = "localUser";
    readonly localUserTokenKey = "localUserToken";
    readonly userListUrl = "/users"
}