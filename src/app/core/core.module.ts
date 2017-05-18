import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { Ng2Webstorage } from 'ng2-webstorage';
import { RouterModule } from "@angular/router";
import "hammerjs";

// Components
import { NavComponent } from "../nav/nav.component";

@NgModule({
    imports: [
        CommonModule,
        Ng2Webstorage,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        RouterModule       
    ],
    exports: [
        CommonModule,
        Ng2Webstorage,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        NavComponent
    ],
    declarations: [
        NavComponent
    ]
})
export class CoreModule { }  