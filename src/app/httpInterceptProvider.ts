import { Injectable } from "@angular/core";
import { HttpModule, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthorizationService } from "./services/authorization.service";
import { NotificationService } from "./services/notification.service";

//modified from https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/
class HttpInterceptor extends Http {
    constructor(backend: ConnectionBackend, 
        defaultOptions: RequestOptions, 
        private router: Router, 
        private authorizationService: AuthorizationService, 
        private notificationService: NotificationService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers = this.authorizationService.getAuthorizedHeaders();
        return options;
    }

    private checkHeader(res: Response) {
        const tokenUpdate = res.headers.get("TokenUpdate");
        if (tokenUpdate) {
            this.authorizationService.updateToken(tokenUpdate);
        }
        return res;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.map(res => this.checkHeader(res))
            .catch((err, source) => {
                if (err.status === 401 && !err.url.endsWith("/login")) {
                    this.notificationService.setNotification("Unauthorized");
                    this.authorizationService.logout();
                    return Observable.throw(err);
                } else {
                    return Observable.throw(err);
                }
            });
    }
}

export function httpInterceptProvider(
    backend: XHRBackend, 
    options: RequestOptions, 
    router: Router, 
    authorizationService: AuthorizationService, 
    notificationService: NotificationService)
    {
        return new HttpInterceptor(backend, options, router, authorizationService, notificationService);
    };