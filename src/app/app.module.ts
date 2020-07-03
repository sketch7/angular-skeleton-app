import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { AppSharedModule } from "./shared";

@NgModule({
	declarations: [AppComponent, ...AREAS_COMPONENTS],
	imports: [
		// vendors
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		FormsModule,
		HttpClientModule,
		ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
		BrowserTransferStateModule,

		// app
		AppSharedModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
