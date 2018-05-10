import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Globals {
    readonly API_URL = "https://tq-template-server-sample.herokuapp.com";
    readonly SNACKBAR_DURATION = 1500;
}