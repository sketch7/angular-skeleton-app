import { Routes } from "@angular/router";

import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectComponent } from "./projects/project.component";
import { CommandComponent } from "./command/command.component";

export const AREAS_ROUTES: Routes = [
	{ path: "", component: HomeComponent, pathMatch: "full" },
	{ path: "projects", component: ProjectsComponent },
	{ path: "command", component: CommandComponent },
	{ path: "error", component: ErrorComponent },
	{ path: "**", component: NotFoundComponent },
];

export const AREAS_COMPONENTS = [
	HomeComponent,
	ProjectsComponent,
	ProjectComponent,
	NavComponent,
	ErrorComponent,
	NotFoundComponent,
	CommandComponent,
];
