import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalStoreService } from './store/global-store.service';

@Injectable()
export class TokenInterceptorService
  implements HttpInterceptor {
  private token: string;

  constructor(private globalStore: GlobalStoreService) {
    this.subscribeToTokenChanges();
  }

  private subscribeToTokenChanges() {
    this.globalStore
      .selectUserToken$()
      .subscribe(this.setToken);
  }

  private setToken = (token: string) => (this.token = token);

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorizedRequest = this.setAuthorizationHeader(req);
    const handledRequest = next.handle(authorizedRequest);
    return handledRequest;
  }
  private setAuthorizationHeader(
    req: HttpRequest<any>
  ): HttpRequest<any> {
    const authorizationToken = `Bearer ${this.token}`;
    const headers = req.headers.set(
      'Authorization',
      authorizationToken
    );
    const authorizedReq = req.clone({ headers });
    return authorizedReq;
  }
}
