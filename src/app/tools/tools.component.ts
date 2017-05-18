import { Component, OnInit } from '@angular/core';
import { ToolsService } from "../services/tools.service";
import { NotificationService } from "../services/notification.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {MdSnackBar, MdSnackBarRef, SimpleSnackBar} from '@angular/material';

@Component({
    selector: 'tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

    title = 'Maintenance Log';
    taskLogs = [];
    notificationFormGroup: FormGroup;
    hasError: boolean;
    errorMessage: string = "Error while sending notification.";
    snackBarRef: MdSnackBarRef<SimpleSnackBar>;

    constructor(
        private toolsService: ToolsService,
        private notificationService: NotificationService,
        private builder: FormBuilder,
        private snackBar: MdSnackBar) {

        this.notificationFormGroup = builder.group({
            email: ['', [Validators.required, Validators.pattern("^[^@]+@[^@]+\\.[^@]+$")]],
            message: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.getTasklog();
    }

    getTasklog(): void {
        this.notificationService.showLoader();
        this.toolsService.getTaskLogs().then((result) => {
            this.taskLogs = result;
            this.notificationService.hideLoader();
        });
    }

    sendNotification(): void {        
        this.showLoader();
        let email = this.notificationFormGroup.get('email').value;
        let message = this.notificationFormGroup.get('message').value;

        this.toolsService.sendNotification(email, message)
            .then((success: boolean) => {
                if (success) {
                    this.notificationFormGroup.reset();
                    this.hideLoader();
                    this.snackBar.open("Notification has been sent.", "Success", { duration: 2000 });
                } else {
                    this.hideLoader();
                    this.showError();
                }
            });
    }

    private showLoader(): void {
        this.hasError = false;
        this.notificationService.hideLoadError();
        this.notificationService.showLoader();
    }

    private hideLoader(): void {
        this.notificationService.hideLoader();
    }

    private showError(): void {
        this.notificationService.showLoadError();
        this.hasError = true;
    }
}
