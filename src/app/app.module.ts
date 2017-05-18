// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app.routed.module";
import { CoreModule } from "./core/core.module";
import { ToolsModule } from "./tools/tools.module";

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { FooterComponent } from "./footer/footer.component";

// Services
import { AuthGuard } from "./services/auth.guard";
import { AuthenticationService } from "./services/authentication.service";
import { NotificationService } from "./services/notification.service";
import { ToolsService } from "./services/tools.service";
import { AppConfigService } from "./services/app-config.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ToolsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    NotificationService,
    ToolsService,
    AppConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
