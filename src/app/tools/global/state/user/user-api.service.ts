import { environment } from "@environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserApi {
  private url = environment.apiUrl + "pub/credentials/";
  constructor(private http: HttpClient) {}

  public sendCredential(credential, service: string): Observable<any> {
    const credentialsUrl = this.url + service.toLowerCase();
    return this.http.post(credentialsUrl, credential);
  }
}
