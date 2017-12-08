import { Component } from "@angular/core";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.scss"],
})
export class NavComponent {
	appTitle = "Angular labs";
	appVersion = "1.0";

	links = [
		{ path: ["/"], title: "Home", activeOptions: { exact: true } },
		{ path: ["/heroes"], title: "Heroes" },
		{ path: ["/command"], title: "Command" },
	];
}
