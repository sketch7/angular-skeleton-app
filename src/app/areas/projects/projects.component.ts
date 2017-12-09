import { Component, OnInit } from "@angular/core";
import { Project } from "./projects.model";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
	projects: Project[] = [
		// js
		{
			key: "ssv-core",
			title: "ssv-core",
			tag: "javascript",
			url: "https://github.com/sketch7/ssv-ng2-command",
			description: "typescript core functions and utils",
		},
		{
			key: "signalr-client",
			title: "signalr client",
			tag: "javascript",
			url: "https://github.com/sketch7/signalr-client",
			description: "SignalR client library built on top of @aspnet/signalr-client. This gives you more features and easier to use.",
		},

		// ngx
		{
			key: "ng2-command",
			title: "ng2 command",
			tag: "angular",
			url: "https://github.com/sketch7/ssv-ng2-command",
			description:
				"Command pattern implementation for angular 2. Command's are used to encapsulate information which is needed to perform an action.",
		},
		{
			key: "ng2-heroes",
			title: "ng2 heroes",
			tag: "angular",
			url: "https://github.com/sketch7/ng2-heroes",
			description: "angular2 heroes sample application",
		},

		// au
		{
			key: "ssv-au-core",
			title: "ssv-au-core",
			tag: "aurelia",
			url: "https://github.com/sketch7/ssv-au-core",
			description: "Core components, utilities and services for Aurelia by Sketch7",
		},
		{
			key: "ssv-au-ui",
			title: "ssv-au-ui",
			tag: "aurelia",
			url: "https://github.com/sketch7/ssv-au-ui",
			description: "UI components library for Aurelia by Sketch7",
		},

		// csharp
		{
			key: "fluently-http-client",
			title: "Fluently Http Client",
			tag: "csharp",
			url: "https://github.com/sketch7/FluentlyHttpClient",
			description: "Http Client for .NET Standard with fluent APIs which are intuitive, easy to use and also highly extensible.",
		},
	];

	constructor() {}

	ngOnInit() {}
}
