import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AREAS_COMPONENTS } from "./areas/index";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppSharedModule } from "./shared";

@NgModule({
	declarations: [
		AppComponent,
		...AREAS_COMPONENTS
	],
	imports: [
		// vendors
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: !isDevMode(),
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
