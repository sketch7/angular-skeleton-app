import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppRoutingModule } from "./app-routing.module";

import { environment } from "../environments/environment";
import { CommandComponent } from "./command/command.component";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";

@NgModule({
	declarations: [AppComponent, CommandComponent, NavComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		AppRoutingModule,
		ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
