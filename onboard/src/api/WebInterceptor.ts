import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginService } from "./LoginService";
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WebInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
        HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `${this.loginService.getLocalUserToken()}`
            }
        });

        next.handle(request).subscribe(
            success => this.loginService.isLoggedIn = true,
            error => this.onRequestError(error)
        );
        return next.handle(request);
    }

    onRequestError(error) {
        if (error.status == 401){
            this.loginService.refreshSession();
        }
    }
}