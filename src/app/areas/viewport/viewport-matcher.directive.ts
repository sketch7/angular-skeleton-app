import * as _ from "lodash";
import {
	OnInit,
	OnDestroy,
	Directive,
	Renderer2,
	ViewContainerRef,
	Input,
	EmbeddedViewRef,
	TemplateRef,
} from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { tap, filter, pairwise, startWith } from "rxjs/operators";

import {
	ViewportService,
	ViewportSizeTypeInfo,
	ViewportSizeType,
} from "./viewport.service";
import {
	ViewportSizeMatcherExpression,
	isViewportSizeMatcherExpression,
	COMPARISON_OPERATION_FUNC_MAPPING,
	isViewportSizeMatcherTupleExpression
} from "./viewport.util";

export class SsvViewportMatcherContext {
	sizeType: string | string[] | null = null;
	sizeTypeExclude: string | string[] | null = null;
	expresson?: ViewportSizeMatcherExpression;
}

function match(
	value: string | string[] | null,
	targetValue: string,
	defaultValue: boolean,
) {
	if (!value) {
		return defaultValue;
	}

	return _.isArray(value)
		? _.includes(value, targetValue)
		: value === targetValue;
}

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: "[ssvViewportMatcher]",
})
export class SsvViewportMatcherDirective implements OnInit, OnDestroy {

	private _context: SsvViewportMatcherContext = new SsvViewportMatcherContext();
	private _thenTemplateRef: TemplateRef<SsvViewportMatcherContext> | null = null;
	private _elseTemplateRef: TemplateRef<SsvViewportMatcherContext> | null = null;
	private _thenViewRef: EmbeddedViewRef<SsvViewportMatcherContext> | null = null;
	private _elseViewRef: EmbeddedViewRef<SsvViewportMatcherContext> | null = null;
	private sizeType$$: Subscription | undefined;
	private update$$: Subscription | undefined;
	private cssClass$$: Subscription | undefined;
	private update$ = new Subject<SsvViewportMatcherContext>();

	sizeInfo: ViewportSizeTypeInfo | undefined;

	constructor(
		private viewport: ViewportService,
		private renderer: Renderer2,
		private _viewContainer: ViewContainerRef,
		templateRef: TemplateRef<SsvViewportMatcherContext>,
	) {
		this._thenTemplateRef = templateRef;
	}

	ngOnInit() {
		console.log("ssvViewportMatcher init");

		this.update$$ = this.update$
			.pipe(
				// tap(x => console.log(">>> ssvViewportMatcher - update triggered", x)),
				filter(() => !!this.sizeInfo),
				// tap(x => console.log(">>> ssvViewportMatcher - updating...", x)),
				tap(() => this._updateView(this.sizeInfo!)),
			)
			.subscribe();

		this.sizeType$$ = this.viewport.sizeType$
			.pipe(
				tap(x => console.log("ssvViewportMatcher - sizeType changed x2", x)),
				tap(x => (this.sizeInfo = x)),
				tap(() => this.update$.next(this._context)),
			)
			.subscribe();

		this.cssClass$$ = this.viewport.sizeType$
			.pipe(
				startWith<ViewportSizeTypeInfo | undefined>(undefined),
				filter(() => !!(this._thenViewRef || this._elseViewRef)),
				pairwise(),
				tap(([prev, curr]) => {
					const el = this._thenViewRef
						? this._thenViewRef.rootNodes[0]
						: this._elseViewRef!.rootNodes[0];
					if (prev) {
						this.renderer.removeClass(el, `vp-size--${prev.name}`);
					}
					this.renderer.addClass(el, `vp-size--${curr!.name}`);
				}),
			)
			.subscribe();
	}

	ngOnDestroy() {
		if (this.cssClass$$) {
			this.cssClass$$.unsubscribe();
		}
		if (this.sizeType$$) {
			this.sizeType$$.unsubscribe();
		}
		if (this.update$$) {
			this.update$$.unsubscribe();
		}
	}

	@Input()
	set ssvViewportMatcher(value: string | string[] | ViewportSizeMatcherExpression) {
		console.log(">>> ssvViewportMatcher set", value);
		if (isViewportSizeMatcherExpression(value)) {
			this._context.expresson = value;
		} else if (isViewportSizeMatcherTupleExpression(value)) {
			const [op, size] = value;
			this._context.expresson = {
				operation: op,
				size
			};
		} else {
			this._context.sizeType = value;
		}

		if (this.sizeInfo) {
			this.update$.next(this._context);
		}
	}

	@Input()
	set ssvViewportMatcherExclude(value: string | string[]) {
		console.log(">>> ssvViewportMatcherExclude set", value);

		this._context.sizeTypeExclude = value;

		if (this.sizeInfo) {
			this.update$.next(this._context);
		}
	}

	@Input()
	set ssvViewportMatcherElse(templateRef: TemplateRef<SsvViewportMatcherContext> | null) {
		this._elseTemplateRef = templateRef;
		this._elseViewRef = null; // clear previous view if any.
		if (this.sizeInfo) {
			this.update$.next(this._context);
		}
	}

	private _updateView(sizeInfo: ViewportSizeTypeInfo) {
		if (this.shouldRender(sizeInfo, this._context)) {
			if (!this._thenViewRef) {
				this._viewContainer.clear();
				this._elseViewRef = null;

				if (this._thenTemplateRef) {
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

	private shouldRender(
		sizeInfo: ViewportSizeTypeInfo,
		context: SsvViewportMatcherContext,
	) {
		const isExcluded = match(context.sizeTypeExclude, sizeInfo.name, false);
		let isIncluded;
		let isExpressionTruthy;

		if (!isExcluded && context.expresson) {
			const expressionSizeTypeValue: number = ViewportSizeType[
				context.expresson.size as any
			] as any;
			const expMatcher = COMPARISON_OPERATION_FUNC_MAPPING[context.expresson.operation];

			isExpressionTruthy = expMatcher(sizeInfo.type, expressionSizeTypeValue);
			console.warn(">>> expression", {
				expressionSizeTypeValue,
				isExpressionTruthy,
			});
		} else {
			isIncluded = match(context.sizeType, sizeInfo.name, true);
		}

		const shouldRender = (isExpressionTruthy || isIncluded) && !isExcluded;
		console.warn(">>> shouldRender", { sizeInfo, context, shouldRender });
		return shouldRender;
	}

}

