import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../app/globals";
import { User } from "../app/user";
import { UserListResponse } from "./response/UserListResponse";
import { UserInfoResponse } from "./response/UserInfoResponse";
import { UserAdd } from "./response/UserAdd";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly userListUrl: string;
    private readonly userInfoUrl: string;
    private readonly userAddUrl: string;
    
    constructor(private httpClient: HttpClient, private globals: Globals){
        this.userListUrl = globals.apiUrl + "/users";
        this.userInfoUrl = globals.apiUrl + "/users/:userId"
        this.userAddUrl = globals.apiUrl + "/users";
    }

    getUserListAsync() {
        return this.httpClient.get<UserListResponse>(this.userListUrl);        
    }

    getUserInfoAsync(userId: number) {
        return this.httpClient.get<UserInfoResponse>(this.userInfoUrl.replace(":userId", userId.toString())).pipe(
            map(response => response.data)
        );
    }

    addAsync(userAdd: UserAdd) {
        return this.httpClient.post(this.userAddUrl, userAdd);
    }
}