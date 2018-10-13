import * as _ from "lodash";
import { Dictionary } from "@ssv/core";
import { DOCUMENT } from "@angular/common";
import { Injectable, Inject } from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import {
	debounceTime,
	map,
	distinctUntilChanged,
	startWith,
	share,
} from "rxjs/operators";

// import { WindowRef } from "../platform/window";
// import { DeviceType } from "../app-info/app-info.model";
// import { AppInfoService } from "../app-info/app-info.service";

export interface ViewportSize {
	width: number;
	height: number;
}

export enum ViewportSizeType {
	xsmall = 0,
	small = 1,
	medium = 2,
	large = 3,
	xlarge = 4,
	xxlarge = 5,
}

export interface ViewportSizeRef {
	type: ViewportSizeType;
	name: string;
	width: number;
}

/** Viewport sizes config, by upper bound. e.g. given width '1000' and `medium` is set to '992' => `large`. */
const viewportSizesConfig = {
	xsmall: 450,
	small: 767,
	medium: 992,
	large: 1200,
	xlarge: 1500,
	xxlarge: 2000,
};

// todo: autogenereate
const viewportSizeRefs: Dictionary<Readonly<ViewportSizeRef>> = {
	[ViewportSizeType.xsmall]: Object.freeze({
		name: "xsmall",
		type: ViewportSizeType.xsmall,
		width: viewportSizesConfig.xsmall,
	}),
	[ViewportSizeType.small]: Object.freeze({
		name: "small",
		type: ViewportSizeType.small,
		width: viewportSizesConfig.small,
	}),
	[ViewportSizeType.medium]: Object.freeze({
		name: "medium",
		type: ViewportSizeType.medium,
		width: viewportSizesConfig.medium,
	}),
	[ViewportSizeType.large]: Object.freeze({
		name: "large",
		type: ViewportSizeType.large,
		width: viewportSizesConfig.large,
	}),
	[ViewportSizeType.xlarge]: Object.freeze({
		name: "xlarge",
		type: ViewportSizeType.xlarge,
		width: viewportSizesConfig.xlarge,
	}),
	[ViewportSizeType.xxlarge]: Object.freeze({
		name: "xxlarge",
		type: ViewportSizeType.xxlarge,
		width: viewportSizesConfig.xxlarge,
	}),
};

/** Polling speed in [ms] can be used for throttle, debounce etc... */
export const POLLING_SPEED = {
	low: 1000,
	mediumLow: 700,
	medium: 500,
	mediumHigh: 300,
	high: 100,
	fps60: 33,
	fps30: 66,
};

// /** Viewport size for SSR. */
// const viewportSizeSSR: Dictionary<ViewportSize> = {
// 	[DeviceType.desktop]: {
// 		width: 1366,
// 		height: 768,
// 	},
// 	[DeviceType.tablet]: {
// 		width: 768,
// 		height: 1024,
// 	},
// 	[DeviceType.mobile]: {
// 		width: 414,
// 		height: 736,
// 	},
// };

@Injectable()
export class ViewportService {
	/** Observable when window is resized (which is also throttled). */
	resize$: Observable<ViewportSize>;

	/** Observable when window is resized (which is also throttled). */
	sizeType$: Observable<ViewportSizeRef>;

	constructor(
		// private windowRef: WindowRef,
		// private appInfo: AppInfoService,
		@Inject(DOCUMENT) private document: any,
	) {
		// if (windowRef.hasNative) {
		this.resize$ = fromEvent<Event>(window, "resize").pipe(
			map(() => this.getViewportSize()),
			debounceTime(POLLING_SPEED.fps30),
			share(),
		);
		// } else {
		// 	this.resize$ = of(viewportSizeSSR[this.appInfo.deviceType]);
		// }

		this.sizeType$ = this.resize$.pipe(
			startWith(this.getViewportSize()),
			map(x => this.calculateViewportSize(x.width)),
			distinctUntilChanged(),
		);
	}

	private getViewportSize(): ViewportSize {
		return {
			width: this.document.documentElement.clientWidth,
			height: this.document.documentElement.clientHeight,
		};
	}

	private calculateViewportSize(width: number): ViewportSizeRef {
		if (_.inRange(width, viewportSizesConfig.xsmall)) {
			return viewportSizeRefs[ViewportSizeType.xsmall];
		} else if (
			_.inRange(
				width,
				viewportSizesConfig.xsmall,
				viewportSizesConfig.small,
			)
		) {
			return viewportSizeRefs[ViewportSizeType.small];
		} else if (
			_.inRange(
				width,
				viewportSizesConfig.small,
				viewportSizesConfig.medium,
			)
		) {
			return viewportSizeRefs[ViewportSizeType.medium];
		} else if (
			_.inRange(
				width,
				viewportSizesConfig.medium,
				viewportSizesConfig.large,
			)
		) {
			return viewportSizeRefs[ViewportSizeType.large];
		} else if (
			_.inRange(
				width,
				viewportSizesConfig.large,
				viewportSizesConfig.xlarge,
			)
		) {
			return viewportSizeRefs[ViewportSizeType.xlarge];
		} else {
			return viewportSizeRefs[ViewportSizeType.xxlarge];
		}
	}
}
