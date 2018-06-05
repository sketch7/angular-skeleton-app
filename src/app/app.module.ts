import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { OdinCoreModule, CoreConfig, DeviceType, EnvironmentType } from "@odin/ngx.core";

import { AppRoutingModule } from "./app-routing.module";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { AppSharedModule } from "./shared";

const coreConfig: CoreConfig = {
	appInfo: {
		name: "angular-skeleton",
		environment: EnvironmentType.dev,
		gitCommit: "-",
		version: "1.0"
	},
	appConfig: {},
	isDebug: true,
	deviceType: DeviceType.desktop,
	languageCode: "en-GB",
	countryCode: "MT"
};

@NgModule({
	declarations: [AppComponent, ...AREAS_COMPONENTS],
	imports: [
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		AppRoutingModule,
		AppSharedModule,
		OdinCoreModule.forRoot(coreConfig),
		ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
