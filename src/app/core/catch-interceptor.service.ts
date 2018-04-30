import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalStoreService } from './store/global-store.service';

@Injectable()
export class CatchInterceptorService
  implements HttpInterceptor {
  private started;

  constructor(
    private router: Router,
    private globalStore: GlobalStoreService
  ) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const interceptionOperator = tap<HttpEvent<any>>(
      response => {},
      this.catchError
    );
    this.globalStore.dispatchUserMessage('');
    const handledRequest = next.handle(req);
    return handledRequest.pipe(interceptionOperator);
  }

  private catchError = err => {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
      this.globalStore.dispatchUserMessage(err.message);
    }
  };

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.catchUnauthorized();
    } else {
      console.error(err.statusText);
      this.globalStore.dispatchUserMessage(err.statusText);
    }
  }

  private catchUnauthorized() {
    console.warn('Not authorized');
    this.globalStore.dispatchUserMessage('Not authorized');
    this.navigateToLogin();
  }
  private navigateToLogin() {
    this.router.navigateByUrl('/credentials/login');
  }
}
