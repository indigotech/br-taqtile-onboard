import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginService } from "./LoginService";

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
        return next.handle(request);
    }
}