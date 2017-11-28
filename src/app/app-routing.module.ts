import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CommandComponent } from "./command/command.component";

const routes: Routes = [
	{ path: "command", component: CommandComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }