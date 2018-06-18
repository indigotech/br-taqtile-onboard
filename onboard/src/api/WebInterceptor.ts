import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, timer } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginService } from "./LoginService";
import { catchError, takeUntil, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WebInterceptor implements HttpInterceptor {

    readonly requestTimeout = timer(3000);
    constructor(private loginService: LoginService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
        HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `${this.loginService.getLocalUserToken()}`
            }
        });
        return next.handle(request).pipe(
            takeUntil(this.requestTimeout),
            catchError(error => this.onRequestError(error))
        );

    }

    onRequestError(errorResponse) {
        if (errorResponse.status == 401 && this.loginService.isLoggedIn){
            this.loginService.refreshSessionAsync();
        }

        return Observable.throw(errorResponse);
    }
}