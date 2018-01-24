import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
@Injectable()
export class LocaleSampleInterceptor implements HttpInterceptor {

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.warn(">>> locale intercecptor");
		// request = request.clone({
		// 	setHeaders: {
		// 		locale: `en-GB`
		// 	}
		// });
		return next.handle(request);
	}

}