import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnDestroy {

  isloggedin: boolean;
  loggedinSub: any;
  loading: boolean = false;
  loadingSub: any;
  hasError: boolean = false;
  showErrorSub: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService) {

    this.isloggedin = this.authService.isLoggedIn();

    this.loggedinSub = this.authService.loggedInEvent.subscribe((isLoggedIn) => {
      this.isloggedin = isLoggedIn;
    });

    this.loadingSub = this.notificationService.showLoaderEventEmitter.subscribe((isShow) => {
      this.loading = isShow;
    });

    this.showErrorSub = this.notificationService.showLoadErrorEventEmitter.subscribe((hasError) => {
      this.hasError = hasError;
    });
  }

  logout(): void {
    if (this.authService.logout()) {
      this.router.navigate(["/login"]);
    }
  }

  ngOnDestroy(): void {
    if (this.loggedinSub) this.loggedinSub.unsubscribe();
    if (this.loadingSub) this.loadingSub.unsubscribe();
    if (this.showErrorSub) this.showErrorSub.unsubscribe();    
  }
}