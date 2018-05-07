import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { GlobalState } from "@tools/global/state";
import { ShowMessage } from "@tools/global/state/message/message.actions";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  private started;

  constructor(private router: Router, private store: Store<GlobalState>) { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const interceptionOperator = tap<HttpEvent<any>>(
      this.logResponse,
      this.catchError
    );
    this.started = Date.now();

    const handledRequest = next.handle(req);
    return handledRequest.pipe(interceptionOperator);
  }

  private logResponse = (event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      console.debug(`Request for ${event.url} took ${elapsed_ms} ms.`);
    }
  };

  private catchError = err => {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
      this.store.dispatch(
        new ShowMessage({ caption: err.message, type: "error" })
      );
    }
  };

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.catchUnauthorized();
    } else {
      console.warn(err.statusText);
      this.store.dispatch(
        new ShowMessage({ caption: err.statusText, type: "error" })
      );
    }
  }

  private catchUnauthorized() {
    console.log("Not authorized");
    this.store.dispatch(
      new ShowMessage({ caption: "Not authorized", type: "warn" })
    );
    this.navigateToLogin();
  }
  private navigateToLogin() {
    this.router.navigateByUrl("/credentials/login");
  }
}
