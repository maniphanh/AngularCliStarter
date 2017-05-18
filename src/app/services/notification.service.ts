import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class NotificationService {
    showLoaderEventEmitter: any;
    showLoadErrorEventEmitter: any;

    constructor(){
        this.showLoaderEventEmitter = new EventEmitter<boolean>();
        this.showLoadErrorEventEmitter = new EventEmitter<boolean>();
    }

    showLoader(): void {
        this.showLoaderEventEmitter.emit(true);
    }

    hideLoader(): void {
        this.showLoaderEventEmitter.emit(false);
    }

    showLoadError(): void {
        this.showLoadErrorEventEmitter.emit(true);
    }

    hideLoadError(): void {
        this.showLoadErrorEventEmitter.emit(false);
    }
}