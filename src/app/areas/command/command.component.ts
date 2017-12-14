import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { timer } from "rxjs/observable/timer";
import { tap } from "rxjs/operators";
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

	saveCmd = new CommandAsync(this.save$.bind(this), this.isValid$);
	// saveCmdSync: ICommand = new Command(this.save$.bind(this), this.isValid$, true);
	// saveCmd: ICommand = new Command(this.save$.bind(this), null, true);

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

	save$() {
		return timer(2000).pipe(tap(() => console.warn("save$", "execute complete")));
	}
}
