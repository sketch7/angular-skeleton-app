import * as _ from "lodash";
import {
	Component,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
} from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { CommandAsync } from "@ssv/ngx.command";

interface Hero {
	key: string;
	name: string;
}

@Component({
	selector: "app-command",
	templateUrl: "./command.component.html",
	styleUrls: ["./command.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandComponent {
	isValid = true;
	isExecuting = false;

	isValid$ = new BehaviorSubject(true);
	isValidRedux$ = new BehaviorSubject(true);
	isValidHeroRemove$ = new BehaviorSubject(true);

	saveCmd = new CommandAsync(this.save$.bind(this), this.isValid$);
	removeHeroCmd = new CommandAsync(this.removeHero$.bind(this), this.isValidHeroRemove$);
	saveReduxCmd = new CommandAsync(
		this.saveRedux.bind(this),
		this.isValidRedux$,
	);
	heroes: Hero[] = [
		{ key: "rexxar", name: "Rexxar" },
		{ key: "Malthael", name: "Malthael" },
		{ key: "diablo", name: "Diablo" },
	];

	// saveCmdSync: ICommand = new Command(this.save$.bind(this), this.isValid$, true);
	// saveCmd: ICommand = new Command(this.save$.bind(this), null, true);
	private _state = new BehaviorSubject({ isLoading: false });

	constructor(private cdr: ChangeDetectorRef) {}

	save() {
		this.isExecuting = true;
		setTimeout(() => {
			this.isExecuting = false;
			this.cdr.markForCheck();
			console.warn("save", "execute complete");
		}, 2000);
	}

	toggleValidity(): void {
		this.isValid = !this.isValid;
	}

	toggleValidity$(): void {
		this.isValid$.next(!this.isValid$.value);
	}

	toggleValidityRedux(): void {
		this.isValidRedux$.next(!this.isValidRedux$.value);
	}

	toggleValidityRemoveHero(): void {
		this.isValidHeroRemove$.next(!this.isValidHeroRemove$.value);
	}

	removeHero$(hero: Hero, param2: any, param3: any) {
		console.log("removeHero", { hero, param2, param3, heroes: this.heroes });

		return timer(2000).pipe(
			tap(() =>
				_.remove(this.heroes, {
					key: hero.key,
				}),
			),
			tap(() => console.warn("removeHero$", "execute complete", this.heroes)),
		);
	}

	private save$() {
		return timer(2000).pipe(
			tap(() => console.warn("save$", "execute complete")),
		);
	}

	private saveRedux() {
		// fake dispatch/epic
		this.fakeDispatch();

		// selector
		return this._state.pipe(filter(x => !x.isLoading));
	}

	private fakeDispatch() {
		this._state.next({ isLoading: true });
		timer(2000)
			.pipe(
				tap(() => console.warn("saveRedux$", "execute complete")),
				tap(() => this._state.next({ isLoading: false })),
			)
			.subscribe();
	}
}