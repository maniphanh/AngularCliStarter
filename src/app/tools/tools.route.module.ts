import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ToolsBaseComponent } from "./tools.base.component";
import { ToolsComponent } from "./tools.component";

const routes: Routes = [
    {
        path: "",
        component: ToolsBaseComponent,
        children: [            
            { path: "", component: ToolsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToolsRouteModule { }

export const routedComponents = [
    ToolsBaseComponent,
    ToolsComponent
];
