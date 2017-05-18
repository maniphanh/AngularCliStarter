import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  email: string;
  password: string;
  loginForm: FormGroup;
  hasError: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private builder: FormBuilder,
    private notificationService: NotificationService
  ) {

    this.loginForm = builder.group({
      email: ['', [Validators.required, Validators.pattern("^[^@]+@[^@]+\\.[^@]+$")]],
      password: ['', Validators.required]
    });
  }

  login(): void {    
    this.hideLoginError();
    this.notificationService.showLoader();
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    this.authService.login(email, password).then((success: boolean) => {
      if (success) {
        this.router.navigate(["/"]);
      } else {
        this.showLoginError();
      }
      this.notificationService.hideLoader();
    });
  }

  logout(): void {
    if (this.authService.logout()) {
      this.router.navigate(["/login"]);
    }
  }

  isLoggedIn(): boolean {
    let isloggedin = this.authService.isLoggedIn();
    if (isloggedin)
      this.username = this.authService.getLoggedInUserName();

    return isloggedin;
  }

  private showLoginError(): void {
    this.notificationService.showLoadError();
    this.errorMessage = this.authService.getToken().error_description;
    this.hasError = true;
  }

  private hideLoginError(): void {
    this.hasError = false;
    this.notificationService.hideLoadError();    
  }
}
