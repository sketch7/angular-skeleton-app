import { Component, OnInit } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { tap } from "rxjs/operators";
// import { ILog, LoggingFactory } from "@odin/ngx.core";

import { HeroService } from "./hero.service";
import { Hero, Author } from "app/areas/heroes/hero.model";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
	selector: "app-heroes",
	templateUrl: "./heroes.component.html",
	styleUrls: ["./heroes.component.scss"]
})
export class HeroesComponent implements OnInit, OnDestroy {

	// private logger: ILog;
	private author!: Author;
	private data$$!: ISubscription;

	constructor(
		// loggerFactory: LoggingFactory,
		private service: HeroService
	) {
		// this.logger = loggerFactory.get("HeroesComponent");
	}

	ngOnInit() {
		// const all$ = this.service.getAll().pipe(
		const all$ = this.service.getViaWatch().pipe(
			tap(x => this.author = x),
			// tap(x => this.logger.warn("init", "author fetched", x)),
			tap(x => console.warn("init author fetched", x)),
		);

		this.data$$ = all$.subscribe();
	}

	ngOnDestroy() {
		// this.logger.warn("ngOnDestroy");
		console.warn(">>> ngOnDestroy");
		this.data$$.unsubscribe();
	}

	refresh() {
		console.warn(">>> refresh");
		// this.logger.info("refresh");
		this.service.refresh();
	}

	resetStore() {
		console.warn(">>> resetStore");
		// this.logger.info("resetStore");
		this.service.resetStore();
	}

}