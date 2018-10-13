import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	OnDestroy,
	ChangeDetectorRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { ViewportService, ViewportSizeTypeInfo } from "./viewport.service";

@Component({
	selector: "app-viewport",
	templateUrl: "./viewport.component.html",
	styleUrls: ["./viewport.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewportComponent implements OnInit, OnDestroy {
	private sizeType$$: Subscription | undefined;
	viewportSize: ViewportSizeTypeInfo | undefined;
	isVisible = true;

	constructor(private viewport: ViewportService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.sizeType$$ = this.viewport.sizeType$
			.pipe(
				tap(x => console.info("Viewport - sizeType changed", x)),
				tap(x => this.viewportSize = x),
				tap(() => this.cdr.markForCheck()),
			)
			.subscribe();
	}

	ngOnDestroy() {
		if (this.sizeType$$) {
			this.sizeType$$.unsubscribe();
		}
	}
}
