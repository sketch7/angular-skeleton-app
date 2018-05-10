import { Component } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { CommandAsync } from "@ssv/ngx.command";

@Component({
	selector: "app-command",
	templateUrl: "./command.component.html",
	styleUrls: ["./command.component.scss"],
})
export class CommandComponent {
	isValid = true;
	isExecuting = false;

	isValid$ = new BehaviorSubject(true);
	isValidRedux$ = new BehaviorSubject(true);

	saveCmd = new CommandAsync(this.save$.bind(this), this.isValid$);
	saveReduxCmd = new CommandAsync(
		this.saveRedux.bind(this),
		this.isValidRedux$,
	);
	// saveCmdSync: ICommand = new Command(this.save$.bind(this), this.isValid$, true);
	// saveCmd: ICommand = new Command(this.save$.bind(this), null, true);
	private _state = new BehaviorSubject({ isLoading: false });

	save() {
		this.isExecuting = true;
		setTimeout(() => {
			this.isExecuting = false;
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
