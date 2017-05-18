import { Injectable, EventEmitter } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { SessionStorageService } from "ng2-webstorage";
import { Token } from "../models/token";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { AppConfigService } from "../services/app-config.service";

@Injectable()
export class AuthenticationService {

    loggedInEvent: EventEmitter<boolean>;

    constructor(
        private storage: SessionStorageService,
        private http: Http,
        private appConfigService: AppConfigService) {
        this.loggedInEvent = new EventEmitter<boolean>();
    }

    getLoggedInUserName(): string {
        let token = this.getToken();
        if(token && !token.error) {
            return token.userName;
        }
    }

    getToken(): Token {
        let token = this.storage.retrieve("token");
        if (token) {
            return JSON.parse(token) as Token;
        }
        return token;
    }

    isLoggedIn(): boolean {
        let token = this.storage.retrieve("token");
        if (token) {
            let tokenObj = JSON.parse(token) as Token;
            return tokenObj.error ? false : true;
        }
        return false;
    }

    logout(): boolean {
        this.storage.clear("token");
        this.loggedInEvent.emit(false);
        return true;
    }

    login(email: string, password: string): Promise<boolean> {
        let headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        });
        
        let rootUrl = this.appConfigService.ApiRootUrl;
        let result = this.http.post(rootUrl + "/token",
            "userName=" + encodeURIComponent(email) +
            "&password=" + encodeURIComponent(password) +
            "&grant_type=password"
            , { headers: headers })
            .toPromise()
            .then((response: any) => {
                let token = response.json() as Token;
                token.expiresDate = new Date(token[".expires"]);
                this.storage.store('token', JSON.stringify(token));

                this.loggedInEvent.emit(true);
                return true;
            })
            .catch((error: any) => {     
                let token = error.json() as Token;           
                this.storage.store('token', JSON.stringify(token));

                return false;
            });
        return result;
    }

    private handleError(error: any): Promise<any> {
        console.error("An error occurred", error);        
        return Promise.reject(error.message || error);
    }
}