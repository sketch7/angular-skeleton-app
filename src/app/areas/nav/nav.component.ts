import { Component } from "@angular/core";

import { AppInfoService } from "../../shared";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"],
})
export class NavComponent {
	links = [
		{ path: ["/"], title: "Home", activeOptions: { exact: true } },
		{ path: ["/heroes"], title: "Heroes" },
		{ path: ["/command"], title: "Command" },
	];

	appTitle = this.appInfo.title;
	appVersion = this.appInfo.version;
	appEnv = this.appInfo.environment;
	isDebug = this.appInfo.isDebug;

	constructor(private appInfo: AppInfoService) {}
}
