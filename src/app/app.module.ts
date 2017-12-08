import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { CommandComponent } from "./command/command.component";

@NgModule({
	declarations: [AppComponent, CommandComponent],
	imports: [BrowserModule.withServerTransition({ appId: "serverApp" }), AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
