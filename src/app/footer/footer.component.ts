import { Component } from '@angular/core';

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html"
})
export class FooterComponent {
    thisYear: number;

    constructor() {
        var today = new Date();
        this.thisYear = today.getFullYear();
    }
}