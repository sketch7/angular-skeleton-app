import { Component, OnInit } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { tap } from "rxjs/operators";
import { ILog, LoggingFactory } from "@odin/ngx.core";

import { HeroService } from "./hero.service";
import { Hero } from "app/areas/heroes/hero.model";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
	selector: "app-heroes",
	templateUrl: "./heroes.component.html",
	styleUrls: ["./heroes.component.scss"]
})
export class HeroesComponent implements OnInit, OnDestroy {

	private logger: ILog;
	private heroes: Hero[];
	private data$$: ISubscription;

	constructor(
		loggerFactory: LoggingFactory,
		private service: HeroService
	) {
		this.logger = loggerFactory.get("HeroesComponent");
	}

	ngOnInit() {
		// const all$ = this.service.getAll().pipe(
		const all$ = this.service.getAllViaWatch().pipe(
			tap(x => this.heroes = x),
			tap(x => this.logger.warn("init", "heroes fetched", x)),
		);

		this.data$$ = all$.subscribe();
	}

	ngOnDestroy() {
		this.logger.warn("ngOnDestroy");
		this.data$$.unsubscribe();
	}

	refresh() {
		this.logger.info("refresh");
		this.service.refresh();
	}

	resetStore() {
		this.logger.info("resetStore");
		this.service.resetStore();
	}

}