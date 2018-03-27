import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { GlobalStoreService } from "@tools/global/global-store.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token: string = "";

  constructor(private store: GlobalStoreService) {
    this.subscribeToTokenChanges();
  }

  private subscribeToTokenChanges() {
    this.store.selectUserToken$().subscribe(this.setToken);
  }

  private setToken = token => (this.token = token);

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorizedReq = this.setAuthHeader(req);
    const handledRequest = next.handle(authorizedReq);
    return handledRequest;
  }
  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authToken = `Bearer ${this.token}`;
    const headers = req.headers.set("Authorization", authToken);
    const authorizedReq = req.clone({ headers });
    return authorizedReq;
  }
}
