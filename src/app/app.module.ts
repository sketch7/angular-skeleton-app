import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { AppSharedModule } from "./shared";

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
		// ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
		// BrowserTransferStateModule,

		// app
		AppSharedModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
