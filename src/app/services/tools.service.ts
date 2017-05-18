import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { TaskLog } from "../models/TaskLog";
import { Token } from "../models/token";
import { SessionStorageService } from "ng2-webstorage";
import { AppConfigService } from "../services/app-config.service";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ToolsService {

    constructor(
        private http: Http,
        private storage: SessionStorageService,
        private appConfigService: AppConfigService) { }

    getTaskLogs(): Promise<TaskLog[]> {

        let rootUrl = this.appConfigService.ApiRootUrl;
        return this.http.get(rootUrl + "/api/MaintenanceTaskLog?pageNumber=1&itemPerPage=200", { headers: this.getApiHeaders() })
            .toPromise()
            .then((response: any) => {
                var result = response.json();
                return result.MHomeLogs as TaskLog[];
            })
            .catch((error: any) => {
                console.log(error);
                return [];
            });
    }

    sendNotification(email: string, message: string): Promise<boolean> {
        let rootUrl = this.appConfigService.ApiRootUrl;
        let data = JSON.stringify({ "Email": email, "Message": message });
        return this.http.post(rootUrl + "/api/Notification", data, { headers: this.getApiHeaders() })
            .toPromise()
            .then((response: any) => {
                var result = response.json();
                return result.Success;

            }).catch((error: any) => {
                return false;
            });
    }

    private getApiHeaders(): Headers {
        let headers = new Headers({ "Content-Type": "application/json" });
        let token = this.storage.retrieve("token");
        if (token) {
            let tokenObj = JSON.parse(token) as Token;
            headers.append("Authorization", `Bearer ${tokenObj.access_token}`);
        }

        return headers;
    }
}