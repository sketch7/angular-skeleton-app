import {
	OnInit,
	OnDestroy,
	Directive,
	Renderer2,
	ElementRef,
	ViewContainerRef,
	Input,
	EmbeddedViewRef,
	TemplateRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { tap, filter, delay } from "rxjs/operators";

import { ViewportService, ViewportSizeTypeInfo } from "./viewport.service";
import { NgIfContext } from "@angular/common";

@Directive({
	selector: "[ssvViewportMatcher]",
})
export class SsvViewportMatcher implements OnInit, OnDestroy {
	private _context: NgIfContext = new NgIfContext();
	private _thenTemplateRef: TemplateRef<NgIfContext> | null = null;
	private _elseTemplateRef: TemplateRef<NgIfContext> | null = null;
	private _thenViewRef: EmbeddedViewRef<NgIfContext> | null = null;
	private _elseViewRef: EmbeddedViewRef<NgIfContext> | null = null;
	private sizeType$$: Subscription | undefined;
	sizeInfo: ViewportSizeTypeInfo | undefined;

	constructor(
		private viewport: ViewportService,
		private renderer: Renderer2,
		private element: ElementRef,
		private _viewContainer: ViewContainerRef,
		templateRef: TemplateRef<NgIfContext>
	) {
		this._thenTemplateRef = templateRef;
	}

	ngOnInit() {
		console.warn("ssvViewportMatcher init");
		this.sizeType$$ = this.viewport.sizeType$
			.pipe(
				tap(x => console.info("SsvViewportMatcher - sizeType changed", x)),
				filter(() => !!this._thenViewRef),
				tap(x => {

					if (this._thenViewRef) {
						if (this.sizeInfo) {
							this.renderer.removeClass(
								this._thenViewRef.rootNodes[0],
								`vp-size--${this.sizeInfo.name}`,
							);
						}
						this.renderer.addClass(
							// this.element.nativeElement,
							this._thenViewRef.rootNodes[0],
							`vp-size--${x.name}`,
						);
					}
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

	@Input()
	set ssvViewportMatcher(condition: any) {
		this._context.$implicit = this._context.ngIf = condition;
		this._updateView();
	}

	private _updateView() {
		if (this._context.$implicit) {
			if (!this._thenViewRef) {
				console.log(">>> _updateView - #1 !thenViewRef");
				this._viewContainer.clear();
				this._elseViewRef = null;
				if (this._thenTemplateRef) {
					console.log(">>> _updateView - #2 thenTemplateRef");
					this._thenViewRef = this._viewContainer.createEmbeddedView(
						this._thenTemplateRef,
						this._context,
					);
				}
			}
		} else {
			if (!this._elseViewRef) {
				this._viewContainer.clear();
				this._thenViewRef = null;
				if (this._elseTemplateRef) {
					this._elseViewRef = this._viewContainer.createEmbeddedView(
						this._elseTemplateRef,
						this._context,
					);
				}
			}
		}
	}
}
