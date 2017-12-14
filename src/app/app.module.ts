import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { CommandModule } from "@ssv/ngx.command";

import { AppRoutingModule } from "./app-routing.module";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { AppSharedModule } from "./shared/shared.module";

// const commandConfig: CommandOptions = {
// 	executingCssClass: "is-busy",
// };

@NgModule({
	declarations: [AppComponent, ...AREAS_COMPONENTS],
	imports: [
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		AppRoutingModule,
		AppSharedModule,
		// CommandModule.forRoot(commandConfig),
		CommandModule.forRoot(),
		ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
