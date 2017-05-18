import { NgModule } from "@angular/core";
import { CoreModule } from "../core/core.module";
import { ToolsRouteModule, routedComponents } from "./tools.route.module";

@NgModule({
    imports: [ToolsRouteModule, CoreModule],
    declarations: [routedComponents]
})
export class ToolsModule { }