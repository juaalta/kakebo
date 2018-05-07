import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  // private token: string = "";
  // constructor(private store: Store<GlobalState>) {
  //   this.subscribeToTokenChanges();
  // }
  // private subscribeToTokenChanges() {
  //   this.store.select(state => state.user).subscribe(this.setToken);
  // }
  // private setToken = user => (this.token = user.token);

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorizedReq = this.setAuthHeader(req);
    const handledRequest = next.handle(authorizedReq);
    return handledRequest;
  }

  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    const headers = req.headers.set("Authorization", authToken);
    const authorizedReq = req.clone({ headers });
    return authorizedReq;
  }

}
