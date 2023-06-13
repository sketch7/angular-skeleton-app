import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AREAS_ROUTES } from "./areas/index";

const routes: Routes = [
	...AREAS_ROUTES
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		initialNavigation: "enabledBlocking"
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
