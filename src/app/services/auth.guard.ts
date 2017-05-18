import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Http, Response } from "@angular/http";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.authenticationService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        } else {
            // check token expiration
            let token = this.authenticationService.getToken();
            let now = new Date();
            if (now > token.expiresDate) {
                this.authenticationService.logout();
                this.router.navigate(["/login"]);
            }
        }
        return true;
    }
}