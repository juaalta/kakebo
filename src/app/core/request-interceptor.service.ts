import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorService
  implements HttpInterceptor {
  private started;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.started = Date.now();
    const handledRequest = next.handle(req);
    const interceptionOperator = tap<HttpEvent<any>>(
      this.interceptResponse,
      this.catchError
    );
    return handledRequest.pipe(interceptionOperator);
  }

  private interceptResponse = (event: HttpEvent<any>): void => {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      console.log(
        `Request for ${event.url} took ${elapsed_ms} ms.`
      );
    }
  };

  private catchError = (err): void => {
    if (err instanceof HttpErrorResponse) {
      console.warn(err.status + ' - ' + err.statusText);
    } else {
      console.error(err.message);
    }
  };
}
