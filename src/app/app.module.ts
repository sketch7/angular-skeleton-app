import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { InMemoryCache } from "apollo-cache-inmemory";
import { OdinCoreModule, CoreConfig, DeviceType, EnvironmentType } from "@odin/ngx.core";
// import { OdinSharedModule } from "@odin/ngx.shared";

import { AppRoutingModule } from "./app-routing.module";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS, AREAS_SERVICES } from "./areas/index";
import { AppSharedModule } from "./shared";
import { LocaleSampleInterceptor } from "./http.interceptor";

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
	languageCode: "en-GB"
};

@NgModule({
	declarations: [AppComponent, ...AREAS_COMPONENTS],
	imports: [
		HttpClientModule,
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		ApolloModule,
		HttpLinkModule,
		AppRoutingModule,
		AppSharedModule,
		// OdinSharedModule,
		OdinCoreModule.forRoot(coreConfig),
		ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LocaleSampleInterceptor,
			multi: true
		},
		AREAS_SERVICES
	],
	bootstrap: [AppComponent],
})
export class AppModule {

	constructor(
		apollo: Apollo,
		httpLink: HttpLink,
	) {
		apollo.create({
			link: httpLink.create({
				uri: "http://localhost:62551/graphql"
			}),
			cache: new InMemoryCache()
		}, "shrd");
	}

}
