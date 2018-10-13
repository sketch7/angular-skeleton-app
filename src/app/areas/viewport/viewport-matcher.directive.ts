import {
	OnInit,
	OnDestroy,
	Directive,
	Renderer2,
	ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { ViewportService, ViewportSizeTypeInfo } from "./viewport.service";

@Directive({
	selector: "[ssvViewportMatcher]",
})
export class SsvViewportMatcher implements OnInit, OnDestroy {
	private sizeType$$: Subscription | undefined;
	sizeInfo: ViewportSizeTypeInfo | undefined;

	constructor(
		private viewport: ViewportService,
		private renderer: Renderer2,
		private element: ElementRef,
	) {}

	ngOnInit() {
		console.warn("ssvViewportMatcher init");
		this.sizeType$$ = this.viewport.sizeType$
			.pipe(
				tap(x => console.info("SsvViewportMatcher - sizeType changed", x)),
				tap(x => {
					if (this.sizeInfo) {
						this.renderer.removeClass(
							this.element.nativeElement,
							`vp-size--${this.sizeInfo.name}`,
						);
					}
					this.renderer.addClass(
						this.element.nativeElement,
						`vp-size--${x.name}`,
					);
				}),
				tap(x => (this.sizeInfo = x)),
			)
			.subscribe();
	}

	ngOnDestroy() {
		if (this.sizeType$$) {
			this.sizeType$$.unsubscribe();
		}
	}
}
