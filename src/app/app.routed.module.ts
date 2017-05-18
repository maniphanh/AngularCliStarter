import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
    { path: "", pathMatch: "full", canActivate: [AuthGuard], component: HomeComponent },
    { path: "home", canActivate: [AuthGuard], component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "contact", canActivate: [AuthGuard], component: ContactComponent },
    { path: "about", canActivate: [AuthGuard], component: AboutComponent },
    { path: "tools", canActivate: [AuthGuard], loadChildren: "app/tools/tools.module#ToolsModule" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }