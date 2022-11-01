import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { AppSharedModule } from "./shared";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
	declarations: [
		AppComponent,
		...AREAS_COMPONENTS
	],
	imports: [
		// vendors
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		FormsModule,
		HttpClientModule,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: "registerWhenStable:30000"
		}),

		// app
		AppSharedModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
