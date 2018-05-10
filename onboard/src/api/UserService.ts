import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../app/globals";
import { User } from "../app/user";
import { UserListResponse } from "./response/UserListResponse";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly userListUrl: string;
    
    constructor(private httpClient: HttpClient, private globals: Globals){
        this.userListUrl = globals.apiUrl + "/users";
    }

    getUserList() {
        return this.httpClient.get<UserListResponse>(this.userListUrl);        
    }
}